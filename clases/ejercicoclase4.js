import fs from "fs";
const date = new Date();
const hora = date.toLocaleTimeString();
const fecha = date.toLocaleDateString();
const fyh = `[${fecha}  a las ${hora}] Error de importacion`;
const path = "./fyh.txt";
const users = [{ id: 1 }, { id: 2 }];

fs.writeFile(path, fyh, (error) => {
  if (error) return console.log(error);

  
  fs.readFile(path, "utf-8", (error, result) => {
    if (error) return console.log(error);

    console.log(`info: ${result}`);
  });
});




