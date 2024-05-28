package main

import (
	"context"
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"pocketbase/api"
	"pocketbase/hooks"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/liushuangls/go-anthropic"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/jsvm"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

// defaultPublicDir returns the default public directory
func defaultPublicDir() string {
	if strings.HasPrefix(os.Args[0], os.TempDir()) {
		return "./pb_public/"
	}
	return filepath.Join(filepath.Dir(os.Args[0]), "../pb_public/")
}

// servicesHandler returns the available services
func servicesHandler(c echo.Context) error {
	services := []map[string]interface{}{
		{
			"name":   "Anthropic",
			"models": []string{"claude-instant-v1", "claude-instant-v1-100k"},
		},
		{
			"name":   "OpenAI",
			"models": []string{"gpt-3.5-turbo", "gpt-4"},
		},
	}
	return c.JSON(http.StatusOK, services)
}

// claudeHandler handles requests to the Claude API
func claudeHandler(c echo.Context) error {
	var requestBody struct {
		Text  string `json:"text"`
		Model string `json:"model"`
	}
	if err := c.Bind(&requestBody); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request body"})
	}

	client := anthropic.NewClient(goDotEnvVariable("ANTHROPIC_API_KEY"))
	resp, err := client.CreateMessages(context.Background(), anthropic.MessagesRequest{
		Model: requestBody.Model,
		Messages: []anthropic.Message{
			anthropic.NewUserTextMessage(requestBody.Text),
		},
		MaxTokens: 1000,
	})
	if err != nil {
		var e *anthropic.APIError
		if errors.As(err, &e) {
			fmt.Printf("Messages error, type: %s, message: %s", e.Type, e.Message)
		} else {
			fmt.Printf("Messages error: %v\n", err)
		}
		return err
	}

	fmt.Println(resp.Content[0].Text)
	return c.JSON(http.StatusOK, map[string]interface{}{"result": resp.Content[0].Text})
}

// chatGptHandler handles requests to the ChatGPT API
func chatGptHandler(c echo.Context) error {
	var requestBody struct {
		Text  string `json:"text"`
		Model string `json:"model"`
	}
	log.Println("Received request to /api/openai")
	if err := c.Bind(&requestBody); err != nil {
		log.Printf("Error in chatGptHandler: %v", err)
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "Invalid request"})
	}

	chatGPTAPIKey := goDotEnvVariable("CHATGPT_API_KEY")
	result, err := hooks.DoChatGPT(chatGPTAPIKey, requestBody.Text, requestBody.Model)
	if err != nil {
		log.Printf("Error in chatGptHandler: %v", err)
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": "Failed to generate text from ChatGPT"})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{"result": result})
}

// goDotEnvVariable loads environment variables from the .env file
func goDotEnvVariable(key string) string {
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
	return os.Getenv(key)
}

func main() {
	app := pocketbase.New()
	var publicDirFlag string

	// Add "--publicDir" option flag
	app.RootCmd.PersistentFlags().StringVar(
		&publicDirFlag,
		"publicDir",
		defaultPublicDir(),
		"the directory to serve static files",
	)

	// Load JS files to allow loading external JavaScript migrations
	jsvm.MustRegister(app, jsvm.Config{
		HooksWatch: true, // make this false for production
	})

	// Register the `migrate` command
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		TemplateLang: migratecmd.TemplateLangJS, // or migratecmd.TemplateLangGo (default)
		Automigrate:  true,
	})

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		// Register routes
		e.Router.POST("/api/dreamstudio", func(c echo.Context) error { return api.DreamStudioHandler(c, app) })
		e.Router.POST("/api/dalle", api.DalleImageHandler)
		e.Router.GET("/api/services", servicesHandler)
		e.Router.POST("/api/anthropic", claudeHandler)
		e.Router.POST("/api/openai", chatGptHandler)
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS(publicDirFlag), true))
		log.Println("Serving static files from", publicDirFlag)
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
