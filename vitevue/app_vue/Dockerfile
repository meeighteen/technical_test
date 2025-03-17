# Etapa de construcción
FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción con Node.js
FROM node:18-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app/dist /app/dist
COPY --from=build-stage /app/package*.json ./

# Instalar dependencias de producción y un servidor simple
RUN npm install -g serve

# Exponer el puerto
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["serve", "-s", "dist", "-l", "8080"]