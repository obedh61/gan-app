# Dockerfile for Express
FROM node:18
WORKDIR /app

# Copia el archivo de entorno
COPY .env .env

# Instala dependencias
COPY package*.json ./
RUN npm install

# Copia el código fuente
COPY . ./

# Exponer el puerto
EXPOSE 8000

# Iniciar el servidor
CMD ["node", "server.js"]
