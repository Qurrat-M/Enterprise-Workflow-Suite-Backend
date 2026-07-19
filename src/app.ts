import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import { notFound } from "./middleware/notFound";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs";
import cookieParser from "cookie-parser";
import roleRoutes from "./modules/roles/role.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // React frontend
    credentials: true,
  }),
);
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", routes);
app.use("/api/v1/roles", roleRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
