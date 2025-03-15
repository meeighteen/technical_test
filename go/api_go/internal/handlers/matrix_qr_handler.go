package handlers

import (
	"errors"

	"github.com/gofiber/fiber/v2"
	"gonum.org/v1/gonum/mat"
)

// MatrixRequest representa la estructura JSON de entrada.
type MatrixRequest struct {
	Matrix [][]float64 `json:"matrix"`
}

// @Summary Factorización QR
// @Description Calcula la descomposición QR de una matriz rectangular
// @Tags Matrices
// @Accept json
// @Produce json
// @Param request body MatrixRequest true "Matriz de entrada"
// @Success 200 {object} map[string]interface{} "Matrices Q y R"
// @Failure 400 {object} map[string]string "Error en la solicitud"
// @Router /api/matrix/qr [post]
func MatrixQR(c *fiber.Ctx) error {
	var req MatrixRequest

	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": "Datos inválidos"})
	}

	// Convertir la matriz JSON a una matriz Gonum
	q, r, err := qrFactorization(req.Matrix)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"error": err.Error()})
	}

	return c.JSON(fiber.Map{"Q": q, "R": r})
}

// qrFactorization realiza la factorización QR de una matriz
func qrFactorization(data [][]float64) ([][]float64, [][]float64, error) {
	rows := len(data)
	if rows == 0 {
		return nil, nil, errors.New("La matriz no puede estar vacía")
	}
	cols := len(data[0])

	// Convertir [][]float64 en mat.Dense
	flatData := make([]float64, 0, rows*cols)
	for _, row := range data {
		if len(row) != cols {
			return nil, nil, errors.New("Todas las filas deben tener la misma cantidad de columnas")
		}
		flatData = append(flatData, row...)
	}
	matrix := mat.NewDense(rows, cols, flatData)

	// Factorización QR
	var qr mat.QR
	qr.Factorize(matrix)

	// Obtener Q y R
	var q mat.Dense
	var r mat.Dense
	qr.QTo(&q)
	qr.RTo(&r)

	// Convertir Q y R en [][]float64
	return matToSlice(&q), matToSlice(&r), nil
}

// matToSlice convierte una matriz Gonum a un slice [][]float64
func matToSlice(m *mat.Dense) [][]float64 {
	rows, cols := m.Dims()
	result := make([][]float64, rows)
	for i := 0; i < rows; i++ {
		result[i] = make([]float64, cols)
		for j := 0; j < cols; j++ {
			result[i][j] = m.At(i, j)
		}
	}
	return result
}
