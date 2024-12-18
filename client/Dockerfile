# Etapa de construcción
FROM node:18 as build
WORKDIR /app

# Copia el archivo de entorno
COPY .env .env

# Instala dependencias
COPY package*.json ./ 
RUN npm install

# Copia el código fuente
COPY . ./ 

# Construye el proyecto
RUN npm run build

# Etapa de servidor con NGINX
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Copia la configuración de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
