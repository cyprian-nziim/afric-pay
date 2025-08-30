# Stage 1: Base image with Node.js
FROM node:20-alpine AS base

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY angular.json ./
COPY tsconfig*.json ./

### STAGE 2: Development
FROM base AS development
ENV NODE_ENV=development

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Expose dev server port
EXPOSE 4200

# Start development server
CMD ["npm", "start", "--", "--host", "0.0.0.0", "--disable-host-check"]

### STAGE 3: Build for production
FROM base AS builder
ENV NODE_ENV=production

# Install dependencies
RUN npm ci --omit=dev

# Copy source files
COPY . .

# Build the app using launch script
RUN npm run launch

### STAGE 4: Test (for CI)
FROM base AS ci
ENV NODE_ENV=test

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source files
COPY . .

# Run tests
CMD ["npm", "test", "--", "--watch=false", "--browsers=ChromeHeadless"]

### STAGE 5: Production
FROM nginx:alpine AS production
ENV NODE_ENV=production

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built app from builder stage
COPY --from=builder /app/dist/afric-pay /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
