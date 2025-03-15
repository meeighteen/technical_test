package main

import (
	"api_go/routes"
	"log"

	_ "api_go/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/swagger"
	"github.com/joho/godotenv"
)

// @title API RESTful con Fiber
// @version 1.0
// @description Esta API maneja autenticación con JWT en Go usando Fiber.
// @host localhost:3000
// @BasePath /api
func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando .env")
	}

	// Crear instancia de Fiber
	app := fiber.New()

	// Ruta para Swagger
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Configurar rutas
	routes.SetupRoutes(app)

	// Iniciar servidor
	log.Fatal(app.Listen(":3000"))
}
