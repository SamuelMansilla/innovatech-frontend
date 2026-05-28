# ==========================================
# ETAPA 1: Construcción (Builder)
# ==========================================
FROM node:18-alpine AS builder

WORKDIR /app

# OPTIMIZACIÓN DE CACHÉ: Copiamos primero los archivos de dependencias
COPY package*.json ./

# Instalamos las dependencias (usamos 'npm ci' porque es más limpio y rápido para CI/CD)
RUN npm ci

# Copiamos el resto del código (componentes, assets, configuraciones)
COPY . .

# Construimos la aplicación para producción (Vite generará una carpeta llamada 'dist')
RUN npm run build

# ==========================================
# ETAPA 2: Ejecución (Servidor Web Estándar)
# ==========================================
# Cambiamos a la versión oficial estándar de Nginx para poder usar el puerto 80 nativo de internet
FROM nginx:alpine

# Copiamos la carpeta 'dist' generada en la Etapa 1 hacia el directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponemos el puerto 80 estándar de HTTP para responder directo a las consultas del navegador
EXPOSE 80

# Comando para iniciar Nginx y mantenerlo en primer plano
CMD ["nginx", "-g", "daemon off;"]