# Production Stage
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy only package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application files
COPY . .

# Install libvips only if necessary
RUN apt-get update && apt-get install -y --no-install-recommends libvips && \
    rm -rf /var/lib/apt/lists/*

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "app/server.js"]

