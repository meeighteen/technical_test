package main

import (
	"api_go/routes"
	"log"
	"os"
	_ "api_go/docs"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/swagger"
	"github.com/joho/godotenv"
)

// @title API RESTful con Fiber
// @version 1.0
// @description Esta API maneja autenticación con JWT en Go usando Fiber.
// @host localhost:8080
// @BasePath /api
func main() {
	// Cargar variables de entorno
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error cargando .env")
	}

	// Crear instancia de Fiber
	app := fiber.New()

	// Configuracion de cors

	app_local := os.Getenv("APP_VUE_LOCAL")
	app_prod := os.Getenv("APP_VUE_PROD")

	app.Use(cors.New(cors.Config{
		AllowOrigins: app_local + "," + app_prod,
		AllowMethods: "GET,POST,PUT,DELETE",
		AllowHeaders: "Content-Type,Authorization",
	}))

	// Ruta para Swagger
	app.Get("/swagger/*", swagger.HandlerDefault)

	// Configurar rutas
	routes.SetupRoutes(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	// Iniciar servidor
	log.Fatal(app.Listen(":" + port))
}
