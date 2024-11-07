# Stage 1: Build
FROM node:18 as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN apt-get update && apt-get install -y --no-install-recommends libvips && \
    rm -rf /var/lib/apt/lists/*

# Stage 2: Production
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app . 
RUN npm prune --production
EXPOSE 3000
CMD ["node", "app/server.js"]