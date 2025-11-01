# ---------- Stage 1: build ----------
FROM node:18-alpine AS build

# Set working dir
WORKDIR /app

# Copy only package files first (for caching)
COPY package*.json ./

# Install dependencies (use npm ci in CI, npm install is fine here)
RUN npm install

# Copy source
COPY . .

# Build React app for production
RUN npm run build

# ---------- Stage 2: runtime ----------
FROM nginx:stable-alpine

# Remove default nginx html (optional)
RUN rm -rf /usr/share/nginx/html/*

# Copy nginx config to container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx (default command already runs nginx in foreground)
CMD ["nginx", "-g", "daemon off;"]