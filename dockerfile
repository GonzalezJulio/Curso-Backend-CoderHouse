# definir la imagen base

FROM node

# crear carpeta donde se guardara la app

WORKDIR /app-lasgonzalez

# copiar el package.json a la carpeta de trabajo para poder instalear los modulos 

COPY package*.json ./

# installar los modulos 

RUN npm install

# copiar todo lo demas que no este en node_modules y dist a la carpeta de trabajo

COPY . .

# configurar el puerto de contenedor se define en la app
# puerto de APP (por dentro del contenedor 8080)
# puerto de APP (por fuera del contenedor 9999 prod)
EXPOSE 8080
# EXPOSE 8888
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]