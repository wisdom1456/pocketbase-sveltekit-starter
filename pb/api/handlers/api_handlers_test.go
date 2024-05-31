// api/handlers/api_handlers_test.go
package handlers

import (
	"encoding/json"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"os/exec"
	"strings"
	"testing"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/stretchr/testify/assert"
)

// MockExecCommand is a helper function to mock exec.Command
func MockExecCommand(command string, args ...string) *exec.Cmd {
	cs := []string{"-test.run=TestHelperProcess", "--", command}
	cs = append(cs, args...)
	cmd := exec.Command(os.Args[0], cs...)
	cmd.Env = []string{"GO_WANT_HELPER_PROCESS=1"}
	return cmd
}

// TestHelperProcess is a helper function to be used with MockExecCommand
func TestHelperProcess(*testing.T) {
	if os.Getenv("GO_WANT_HELPER_PROCESS") != "1" {
		return
	}
	os.Exit(0)
}

// MockHTTPClient is a helper function to mock HTTP client
type MockHTTPClient struct{}

func (m *MockHTTPClient) Do(req *http.Request) (*http.Response, error) {
	response := &http.Response{
		StatusCode: http.StatusOK,
		Body:       io.NopCloser(strings.NewReader(`{"artifacts":[{"base64":"mocked_base64_image_string","seed":1234,"finishReason":"success"}]}`)),
		Header:     make(http.Header),
	}
	return response, nil
}

func init() {
	// Load environment variables from .env file
	if err := godotenv.Load("../../.env"); err != nil {
		if err := godotenv.Load("../.env"); err != nil {
			if err := godotenv.Load(".env"); err != nil {
				panic("Error loading .env file")
			}
		}
	}
}

func TestServicesHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	if assert.NoError(t, ServicesHandler(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		var services []map[string]interface{}
		if assert.NoError(t, json.Unmarshal(rec.Body.Bytes(), &services)) {
			assert.Len(t, services, 2)
		}
	}
}

func TestDalleImageHandler(t *testing.T) {
	e := echo.New()
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Mock exec.Command
	execCommand = MockExecCommand
	defer func() { execCommand = exec.Command }()

	c.Set("prompt", "test prompt")

	if assert.NoError(t, DalleImageHandler(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestDreamStudioHandler(t *testing.T) {
	e := echo.New()
	app := &pocketbase.PocketBase{}
	req := httptest.NewRequest(http.MethodPost, "/", nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	body := `{"prompt":"test prompt","engineId":"stable-diffusion-v1-6"}`
	req = httptest.NewRequest(http.MethodPost, "/", strings.NewReader(body))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	c = e.NewContext(req, rec)

	if assert.NoError(t, DreamStudioHandler(c, app)) {
		assert.Equal(t, http.StatusOK, rec.Code)
	}
}

func TestClaudeHandler(t *testing.T) {
	e := echo.New()
	reqBody := `{"text":"Hello, Claude!","model":"claude-instant-v1"}`
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(reqBody))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Mock exec.Command
	execCommand = MockExecCommand
	defer func() { execCommand = exec.Command }()

	if assert.NoError(t, ClaudeHandler(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		var resp map[string]interface{}
		if assert.NoError(t, json.Unmarshal(rec.Body.Bytes(), &resp)) {
			assert.Contains(t, resp, "result")
		}
	}
}

func TestChatGptHandler(t *testing.T) {
	e := echo.New()
	reqBody := `{"text":"Hello, GPT!","model":"gpt-3.5-turbo"}`
	req := httptest.NewRequest(http.MethodPost, "/", strings.NewReader(reqBody))
	req.Header.Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)

	// Mock exec.Command
	execCommand = MockExecCommand
	defer func() { execCommand = exec.Command }()

	if assert.NoError(t, ChatGptHandler(c)) {
		assert.Equal(t, http.StatusOK, rec.Code)
		var resp map[string]interface{}
		if assert.NoError(t, json.Unmarshal(rec.Body.Bytes(), &resp)) {
			assert.Contains(t, resp, "result")
		}
	}
}
