package handlers

import (
	"api_go/pkg/middleware"

	"github.com/gofiber/fiber/v2"
)

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

var mockUser = struct {
	ID       int
	Username string
	Password string
}{
	ID:       1,
	Username: "admin",
	Password: "123456",
}

// @Summary Iniciar sesión
// @Description Autentica un usuario y devuelve un token JWT
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body LoginRequest true "Credenciales de usuario"
// @Success 200 {object} map[string]string "Token generado"
// @Failure 400 {object} map[string]string "Error en la solicitud"
// @Failure 401 {object} map[string]string "Credenciales incorrectas"
// @Router /api/login [post]
func Login(c *fiber.Ctx) error {
	var req LoginRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Datos inválidos"})
	}

	if req.Username != mockUser.Username || req.Password != mockUser.Password {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"error": "Credenciales incorrectas"})
	}

	token, err := middleware.GenerateJWT(mockUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"error": "Error generando token"})
	}

	return c.JSON(fiber.Map{"token": token})
}

// @Summary Obtener dashboard
// @Description Accede a información protegida con JWT
// @Tags Dashboard
// @Security BearerAuth
// @Produce json
// @Success 200 {object} map[string]interface{} "Bienvenida y user_id"
// @Failure 401 {object} map[string]string "Token inválido"
// @Router /api/private/dashboard [get]
func Dashboard(c *fiber.Ctx) error {
	userID := c.Locals("user_id")
	return c.JSON(fiber.Map{"message": "Bienvenido al dashboard", "user_id": userID})
}
