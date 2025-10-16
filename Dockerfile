# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including devDependencies for build)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine AS runner

WORKDIR /app

# Set production environment
ENV NODE_ENV=production

# Copy package files
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy built application and necessary files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.js ./

# Create public directory if needed (Next.js might need it)
RUN mkdir -p public

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
