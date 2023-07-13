import express from "express";
import productsRouter from "./router/ProductRouter.js";
import cartRouter from "./router/CartRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(8080, () => {
    console.log("ATR!");
});