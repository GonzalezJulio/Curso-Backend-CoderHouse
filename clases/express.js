import express from "express";

const app = express();

app.get("/hola", (req, res) => {
    /* res.send("Hola Mundo") */
    res.json('<h1>Hola Mundo!</h1>')
});

app.get("/usuario", (req, res) => {
    res.send({nombre: "Eduardo", 
            estudiante:true, 
            califiacion: 10, 
            califinaciones:[1, 2, 3, 4, 5],} )
})

app.post("/hola", (req, res) => {
    res.send("Hola Mundo Post")
})
app.put("/hola", (req, res) => {
    res.send("Hola Mundo Put")
})
app.listen(8080, () => {
    console.log("escuchando el puerto 8080")
})