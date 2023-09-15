import { Router } from 'express';
import * as ProductsController from "../controllers/products.controller.js"

const ProdRouter = Router();

ProdRouter.get("/", ProductsController.GETALLProduct);
ProdRouter.get("/:id", ProductsController.GETProductById)
ProdRouter.post("/", ProductsController.POSTProduct)

export default ProdRouter;