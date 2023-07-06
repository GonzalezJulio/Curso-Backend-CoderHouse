import express from "express"
import productRouter from "./../ProductServer.js"

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(productRouter)

app.listen(8080, () => {
    console.log("ATR")
})