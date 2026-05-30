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
# Nota: Si usas React clásico cambia 'dist' por 'build'. Si usas Vite, déjalo en 'dist'.
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de Nginx si la tuvieras (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]