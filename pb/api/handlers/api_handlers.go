// api/handlers/api_handlers.go
package handlers

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/exec"

	"github.com/go-resty/resty/v2"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/models"
)

var execCommand = exec.Command // Allows mocking in tests

// NewRestyWrapper returns a new instance of resty.Client
func NewRestyWrapper() *resty.Client {
	return resty.New()
}

type TextToImageImage struct {
	Base64       string `json:"base64"`
	Seed         uint32 `json:"seed"`
	FinishReason string `json:"finishReason"`
}

type TextToImageResponse struct {
	Images []TextToImageImage `json:"artifacts"`
}

// ServicesHandler returns the available services
func ServicesHandler(c echo.Context) error {
	services := []map[string]interface{}{
		{
			"name": "Anthropic",
			"models": []string{"claude-3-haiku-20240307",
				"claude-3-sonnet-20240229",
				"claude-3-opus-20240229",
				"claude-2.1",
				"claude-2.0",
				"claude-instant-1.2",
			},
		},
		{
			"name":   "OpenAI",
			"models": []string{"gpt-4o", "gpt-4-turbo-preview", "gpt-3.5-turbo"},
		},
		{
			"name":   "DreamStudio",
			"models": []string{"text-to-image"},
		},
	}
	return c.JSON(http.StatusOK, services)
}

// GenerateImage sends a request to the DreamStudio API and returns the generated image
func GenerateImage(requestBody map[string]interface{}, apiKey string, client *http.Client) ([]byte, error) {
	apiHost := os.Getenv("STABILITY_API_HOST")
	reqUrl := fmt.Sprintf("%s/v1/generation/%s/text-to-image", apiHost, requestBody["engineId"].(string))
	jsonData, _ := json.Marshal(requestBody)

	req, _ := http.NewRequest("POST", reqUrl, io.NopCloser(bytes.NewReader(jsonData)))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+apiKey)

	res, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("HTTP request error: %w", err)
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		var body map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
			return nil, fmt.Errorf("error decoding DreamStudio error response: %w", err)
		}
		return nil, fmt.Errorf("non-200 response from DreamStudio API: %v", body)
	}

	var body TextToImageResponse
	if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
		return nil, fmt.Errorf("error decoding DreamStudio response: %w", err)
	}

	if len(body.Images) == 0 {
		return nil, fmt.Errorf("no images returned from DreamStudio")
	}

	imageBytes, err := base64.StdEncoding.DecodeString(body.Images[0].Base64)
	if err != nil {
		return nil, fmt.Errorf("failed to decode image data: %w", err)
	}

	return imageBytes, nil
}

// DreamStudioHandler handles requests for generating images via the DreamStudio API
func DreamStudioHandler(c echo.Context, app *pocketbase.PocketBase) error {
	var requestBody struct {
		Prompt   string `json:"prompt"`
		EngineId string `json:"engineId"`
	}
	if err := c.Bind(&requestBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid request body")
	}

	apiKey := os.Getenv("STABILITY_API_KEY")
	if apiKey == "" {
		log.Println("Missing STABILITY_API_KEY environment variable")
		return echo.NewHTTPError(http.StatusInternalServerError, "service configuration error")
	}

	requestData := map[string]interface{}{
		"text_prompts": []map[string]string{{"text": requestBody.Prompt}},
		"cfg_scale":    7,
		"height":       1024,
		"width":        1024,
		"samples":      1,
		"steps":        30,
		"engineId":     requestBody.EngineId,
	}

	client := &http.Client{}
	imageBytes, err := GenerateImage(requestData, apiKey, client)
	if err != nil {
		log.Printf("Failed to generate image: %v\n", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to generate image")
	}

	collection, err := app.Dao().FindCollectionByNameOrId("images")
	if err != nil {
		log.Printf("Failed to find collection: %v\n", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	record := models.NewRecord(collection)
	record.Set("image", imageBytes)

	if err := app.Dao().SaveRecord(record); err != nil {
		log.Printf("Failed to save image record: %v\n", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "database error")
	}

	return c.JSON(http.StatusOK, map[string]string{"id": record.Id})
}

// DalleImageHandler handles requests for generating images via the DALL-E API
func DalleImageHandler(c echo.Context) error {
	var requestBody struct {
		Prompt string `json:"prompt"`
	}
	if err := c.Bind(&requestBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid request body")
	}

	dalleAPIKey := os.Getenv("DALLE_API_KEY")
	model := "image-alpha-001"
	size := "1024x1024"

	cmdArgs := []string{
		"./dalle",
		"-k", dalleAPIKey,
		"-p", requestBody.Prompt,
		"-m", model,
		"-s", size,
	}

	output, err := execCommand(cmdArgs[0], cmdArgs[1:]...).Output()
	if err != nil {
		log.Printf("Error generating Dalle image: %v", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to generate image")
	}

	return c.Blob(http.StatusOK, "image/png", output)
}

// ClaudeHandler handles requests for generating responses via the Claude API
func ClaudeHandler(c echo.Context) error {
	var requestBody struct {
		Text  string `json:"text"`
		Model string `json:"model"`
	}
	if err := c.Bind(&requestBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid request body")
	}

	apiKey := os.Getenv("ANTHROPIC_API_KEY")
	if apiKey == "" {
		log.Println("Missing ANTHROPIC_API_KEY environment variable")
		return echo.NewHTTPError(http.StatusInternalServerError, "service configuration error")
	}

	client := NewRestyWrapper()
	resp, err := client.R().
		SetAuthToken(apiKey).
		SetHeader("Content-Type", "application/json").
		SetBody(map[string]interface{}{
			"model": requestBody.Model,
			"messages": []map[string]string{
				{"role": "user", "content": requestBody.Text},
			},
			"max_tokens": 1024,
		}).
		Post("https://api.anthropic.com/v1/messages")

	if err != nil {
		log.Printf("Claude request failed: %v", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "claude request failed")
	}

	if resp.StatusCode() != http.StatusOK {
		log.Printf("Claude returned error: %s", resp.String())
		return echo.NewHTTPError(http.StatusInternalServerError, "claude returned error")
	}

	var data struct {
		Completion string `json:"completion"`
	}
	err = json.Unmarshal(resp.Body(), &data)
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to parse claude response")
	}
	return c.JSON(http.StatusOK, map[string]interface{}{
		"completion": data.Completion,
	})
}

// ChatGptHandler handles requests for generating responses via the ChatGPT API
func ChatGptHandler(c echo.Context) error {
	var requestBody struct {
		Text  string `json:"text"`
		Model string `json:"model"`
	}
	if err := c.Bind(&requestBody); err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "invalid request body")
	}

	apiKey := os.Getenv("OPENAI_API_KEY")
	if apiKey == "" {
		log.Println("Missing OPENAI_API_KEY environment variable")
		return echo.NewHTTPError(http.StatusInternalServerError, "service configuration error")
	}

	cmdArgs := []string{
		"./chat",
		"-k", apiKey,
		"-t", requestBody.Text,
		"-m", requestBody.Model,
	}

	output, err := execCommand(cmdArgs[0], cmdArgs[1:]...).Output()
	if err != nil {
		log.Printf("Error generating ChatGPT response: %v", err)
		return echo.NewHTTPError(http.StatusInternalServerError, "failed to generate response")
	}

	return c.JSON(http.StatusOK, map[string]string{"result": string(output)})
}
