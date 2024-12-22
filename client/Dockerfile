# Etapa 1: Construcción
FROM node:18 AS build
WORKDIR /app

# Copia los archivos necesarios
COPY package.json package-lock.json ./
RUN npm ci

# Copia el código fuente
COPY . ./

# Construye la aplicación
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

# Configuración de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exposición del puerto
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

