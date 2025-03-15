package routes

import (
	"api_go/internal/handlers"
	"api_go/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

func SetupRoutes(app *fiber.App) {
	api := app.Group("/api")

	// Ruta pública
	api.Post("/login", handlers.Login)

	// Ruta protegida con JWT
	private := api.Group("/private", middleware.JWTMiddleware())

	private.Get("/dashboard", handlers.Dashboard)
	private.Post("/matrix/qr", handlers.MatrixQR)

}
