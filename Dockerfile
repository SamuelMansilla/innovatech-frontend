# Etapa 1: Construcción de los archivos estáticos
FROM node:20-alpine AS build
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código y compilar
COPY . .
RUN npm run build

# Etapa 2: Servidor de producción usando Nginx
FROM nginx:1.25-alpine

# Copiar los archivos compilados desde la etapa anterior al directorio de Nginx
# Lo dejamos apuntando a 'dist' ya que tu proyecto está estructurado con Vite
COPY --from=build /app/dist /usr/share/nginx/html

# 🌟 CLAVE: Activamos esta línea para inyectar nuestro archivo de Proxy Inverso personalizado
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]