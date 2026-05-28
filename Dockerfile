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
# ETAPA 2: Ejecución (Servidor Web)
# ==========================================
# MÍNIMO PRIVILEGIO: Usamos una imagen oficial de Nginx pre-configurada para no ser root.
# Si usamos el 'nginx:alpine' normal, requeriría configuraciones complejas para quitar el root.
FROM nginxinc/nginx-unprivileged:alpine

# Copiamos la carpeta 'dist' generada en la Etapa 1 hacia el directorio público de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Esta imagen de Nginx sin privilegios expone por defecto el puerto 8080 (el puerto 80 requiere root)
EXPOSE 8080

# Comando para iniciar Nginx y mantenerlo en primer plano
CMD ["nginx", "-g", "daemon off;"]