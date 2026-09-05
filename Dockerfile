# Multi-stage production Dockerfile for Google Cloud Run
# Stage 1: Build client and server
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package manifests
COPY package*.json ./
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies
RUN npm --prefix client install
RUN npm --prefix server install

# Copy source code
COPY client/ ./client/
COPY server/ ./server/

# Build client and server production bundles
RUN npm --prefix client run build
RUN npm --prefix server run build

# Prune dev dependencies for lean production footprint
RUN cd server && npm prune --omit=dev

# Stage 2: Minimal secure production runtime
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080
ENV HOST=0.0.0.0

# Copy built server and production node_modules
COPY --chown=node:node --from=builder /app/server/dist ./server/dist
COPY --chown=node:node --from=builder /app/server/node_modules ./server/node_modules
COPY --chown=node:node --from=builder /app/server/package.json ./server/package.json

# Copy client static assets for Express to serve
COPY --chown=node:node --from=builder /app/client/dist ./client/dist

# Security: Run as non-root user
USER node

# Expose standard Cloud Run container port
EXPOSE 8080

# Production start command
CMD ["node", "server/dist/index.js"]
