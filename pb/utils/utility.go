// utils/utility.go
package utils

import (
	"log"
	"os"
	"time"
)

// Logger logs messages with a timestamp
func Logger(message string) {
	log.Printf("[%s] %s\n", time.Now().Format(time.RFC3339), message)
}

// EnvVar returns the value of an environment variable or a default value if the variable is not set
func EnvVar(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// CheckError logs an error if it exists
func CheckError(err error, context string) {
	if err != nil {
		log.Fatalf("Error in %s: %v", context, err)
	}
}

// Contains checks if a string slice contains a specific string
func Contains(slice []string, item string) bool {
	for _, str := range slice {
		if str == item {
			return true
		}
	}
	return false
}
