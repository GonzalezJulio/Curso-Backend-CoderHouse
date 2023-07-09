import express from "express";
import productsRouter from "./router/ProductRouter.js";
import cartRouter from "./router/CartRouter.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* app.use((req, res, next) => {
    if (req.ip == "127.0.0.1") {
      res.status(403).send("No permitido");
    } else {
      next();
    }
  });
app.use((err, req, res, next) => {
    console.error(err);
    res.send("error!");
  }); */
app.use("/file", express.static("db"));
app.use("/api/products", productsRouter);
app.use("/api/cart", cartRouter);

app.listen(8080, () => {
    console.log("ATR!");
});