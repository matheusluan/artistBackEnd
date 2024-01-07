import "dotenv/config";
import "express-async-errors";
import express from "express";
import cors from "cors";
import morgan from "morgan";

import { router } from "./routes";
import { handleAsyncErrors } from "./middlewares/errors.middleware";

const app = express();
const images = process.env.IMAGES_PATH || "";


app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use("/api/v1/images", express.static(images));

app.use(handleAsyncErrors);

export { app };
