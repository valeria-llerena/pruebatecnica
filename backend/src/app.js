import express from "express";
import morgan from "morgan";
import cors from "cors";

import product_router from "./routes/product_router.js";
import order_router from "../src/routes/order_router.js";

const app = express();

//Settings
app.set("port", 8080);

//Middlewares
app.use(
  cors({
    origin: "*",
  })
);
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/product", product_router);
app.use("/api/order", order_router);

export default app;
