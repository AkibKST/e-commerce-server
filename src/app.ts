import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/product.route";

const app = express();

//parsers
app.use(express.json());

//middleware
app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello next World of my life");
});

export default app;
