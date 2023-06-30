import http from "http"

const server = http.createServer((request, response) => {
    console.log(request);
    response.end("Hola soy un servidor http!!");
});
switch(url) {
    case '/hola':
        response.end("Hola Mundo");
        break;
}
server.listen (8080, () => {
    console.log("Escuchando en el puerto 8080")

})