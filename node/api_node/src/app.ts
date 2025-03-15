import express from "express";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";
import { setupSwagger } from "./config/swaggerConfig";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use("/api/public", publicRoutes);

app.use("/api/private", privateRoutes);

// Configurar Swagger
setupSwagger(app);

export default app;
