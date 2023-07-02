import express from "express";

const app = express()

// ? => /evento/:id
// * => /evento/3

app.get('/product/:id', (req, res) => {
    res.send(req.params);
});