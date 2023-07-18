import express from "express";
import handlebars from "express-handlebars";
import __direname from "../desafios/src/dirname.js"
const app = express();
app.engine("handlebars", handlebars.engine())
app.set("views", `${__direname}/views`);
app.set("view engine", "handlebars");


app.get("/", (req, res) => {
    const { nombre } = req.query;
    res.render("index", { nombre: nombre,
    comision: 55230,
    link: "https://google.com"  })
})

app.listen(8080, () => {
    console.log("ATR!");
});