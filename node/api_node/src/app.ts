import express from "express";
import cors from "cors";
import publicRoutes from "./routes/public";
import privateRoutes from "./routes/private";
import { setupSwagger } from "./config/swaggerConfig";

const app = express();

const app_local = process.env.APP_VUE_LOCAL;
const app_prod = process.env.APP_VUE_PROD;

const allowedOrigins = [app_local, app_prod];

const corsOptions = {
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

app.use(cors(corsOptions));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Node.js!");
});

app.use("/api/public", publicRoutes);

app.use("/api/private", privateRoutes);

// Configurar Swagger
setupSwagger(app);

export default app;
