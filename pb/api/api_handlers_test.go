package api

import (
	"net/http"
	"net/http/httptest"
	"os"
	"pocketbase/hooks"
	"testing"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/stretchr/testify/assert"
)

func TestDoChatGPT(t *testing.T) {
    // Mock environment variable
    os.Setenv("CHATGPT_API_KEY", "test-api-key")

    // Mock request body
    text := "test prompt"
    model := "test-model"

    result, err := hooks.DoChatGPT("test-api-key", text, model)
    assert.NoError(t, err)
    assert.NotEmpty(t, result)
}

func TestDalleImageHandler(t *testing.T) {

    e := echo.New()
    req := httptest.NewRequest(http.MethodPost, "/", nil)
    rec := httptest.NewRecorder()
    c := e.NewContext(req, rec)

    // Mock environment variable
    os.Setenv("DALLE_API_KEY", "test-dalle-api-key")

    // Mock request body
    c.Set("prompt", "test prompt")

    // Call handler
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

    // Mock environment variable
    os.Setenv("STABILITY_API_KEY", "test-stability-api-key")

    // Mock request body
    c.Set("prompt", "test prompt")
    c.Set("engineId", "test-engine-id")

    // Call handler
    if assert.NoError(t, DreamStudioHandler(c, app)) {
        assert.Equal(t, http.StatusOK, rec.Code)
    }
}
