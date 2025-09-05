# Dockerfile đơn giản không có nginx - để tích hợp với nginx hiện tại
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Sử dụng Vite preview (có proxy)
FROM node:18-alpine AS production
WORKDIR /app

# Copy package files và install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code và built files
COPY . .
COPY --from=builder /app/dist ./dist

EXPOSE 4000

# Sử dụng Vite preview - có proxy configuration
CMD ["npm", "run", "preview", "--", "--port", "4000", "--host", "0.0.0.0"]
