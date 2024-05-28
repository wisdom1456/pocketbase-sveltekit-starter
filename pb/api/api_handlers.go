package api

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/forms"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/tools/filesystem"
	"pocketbase/hooks"
)

type TextToImageImage struct {
	Base64       string `json:"base64"`
	Seed         uint32 `json:"seed"`
	FinishReason string `json:"finishReason"`
}

type TextToImageResponse struct {
	Images []TextToImageImage `json:"artifacts"`
}

// Load environment variables
func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

// GenerateImage sends a request to the DreamStudio API and returns the generated image
func GenerateImage(requestBody map[string]interface{}, apiKey string) ([]byte, error) {
	apiHost := os.Getenv("API_HOST")
	if apiHost == "" {
		apiHost = "https://api.stability.ai"
	}

	reqUrl := apiHost + "/v1/generation/" + requestBody["engineId"].(string) + "/text-to-image"
	log.Printf("Sending request to DreamStudio API: %s\n", reqUrl)

	jsonData, _ := json.Marshal(requestBody)

	req, _ := http.NewRequest("POST", reqUrl, bytes.NewBuffer(jsonData))
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("Accept", "application/json")
	req.Header.Add("Authorization", "Bearer "+apiKey)

	res, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Printf("HTTP request error: %v\n", err)
		return nil, err
	}
	defer res.Body.Close()

	if res.StatusCode != http.StatusOK {
		var body map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
			log.Printf("Error decoding error response: %v\n", err)
			return nil, fmt.Errorf("Non-200 response from DreamStudio API: %v", err)
		}
		log.Printf("DreamStudio API error response: %v\n", body)
		return nil, fmt.Errorf("Non-200 response from DreamStudio API: %v", body)
	}

	var body TextToImageResponse
	if err := json.NewDecoder(res.Body).Decode(&body); err != nil {
		log.Printf("Error decoding DreamStudio response: %v\n", err)
		return nil, fmt.Errorf("failed to decode DreamStudio response: %v", err)
	}

	if len(body.Images) == 0 {
		log.Printf("No images returned from DreamStudio\n")
		return nil, errors.New("no images returned from DreamStudio")
	}

	generatedImage := body.Images[0]

	imageBytes, err := base64.StdEncoding.DecodeString(generatedImage.Base64)
	if err != nil {
		log.Printf("Error decoding image data: %v\n", err)
		return nil, fmt.Errorf("failed to decode image data: %v", err)
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
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	apiKey := os.Getenv("STABILITY_API_KEY")
	if apiKey == "" {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Missing STABILITY_API_KEY environment variable"})
	}

	requestData := map[string]interface{}{
		"text_prompts": []map[string]string{
			{"text": requestBody.Prompt},
		},
		"cfg_scale": 7,
		"height":    1024,
		"width":     1024,
		"samples":   1,
		"steps":     30,
		"engineId":  requestBody.EngineId,
	}

	log.Printf("Generating image with request data: %v\n", requestData)

	imageBytes, err := GenerateImage(requestData, apiKey)
	if err != nil {
		log.Printf("Failed to generate image: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": fmt.Sprintf("Failed to generate image: %v", err)})
	}

	collection, err := app.Dao().FindCollectionByNameOrId("images")
	if err != nil {
		log.Printf("Failed to find collection: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to find collection"})
	}

	record := models.NewRecord(collection)

	form := forms.NewRecordUpsert(app, record)
	form.LoadData(map[string]any{
		"originalName": "generated_image.png",
		"size":         len(imageBytes),
		"contentType":  "image/png",
	})

	file, err := filesystem.NewFileFromBytes(imageBytes, "generated_image.png")
	if err != nil {
		log.Printf("Failed to create file from bytes: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to create file from bytes"})
	}

	form.AddFiles("file", file)

	if err := form.Submit(); err != nil {
		log.Printf("Failed to save image record: %v\n", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save image record"})
	}

	return c.JSON(http.StatusOK, map[string]string{"id": record.Id})
}

// DalleImageHandler handles requests for generating images via the DALL-E API
func DalleImageHandler(c echo.Context) error {
	var requestBody struct {
		Prompt string `json:"prompt"`
	}

	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	dalleAPIKey := goDotEnvVariable("DALLE_API_KEY")
	prompt := requestBody.Prompt
	model := "dall-e-2"
	size := "512x512"

	b64Data, err := hooks.DoDalle3(dalleAPIKey, prompt, model, size)
	if err != nil {
		log.Printf("Error generating image: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate image"})
	}

	data, err := base64.StdEncoding.DecodeString(b64Data)
	if err != nil {
		log.Printf("Error decoding base64 data: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to decode image data"})
	}

	fileName := fmt.Sprintf("dalle_image_%v.png", time.Now().Unix())
	filePath := filepath.Join("./pb_public/", fileName)

	err = os.WriteFile(filePath, data, 0644)
	if err != nil {
		log.Printf("Error writing image to file: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to save image file"})
	}

	url := fmt.Sprintf("http://localhost:8090/%s", fileName)
	return c.JSON(http.StatusOK, map[string]interface{}{"url": url})
}
