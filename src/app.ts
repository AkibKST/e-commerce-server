import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";
import { OrderRoutes } from "./modules/orders/order.route";

const app = express();

//parsers
app.use(express.json());

//middleware
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello next World of my life");
});

export default app;
