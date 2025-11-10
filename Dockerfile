# --- Stage 1: Build the app ---
FROM node:20.19-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# --- Stage 2: Serve the built app ---
FROM node:20.19-alpine
WORKDIR /app
RUN npm install -g serve

# Copy the built files from builder
COPY --from=builder /app/dist ./dist

EXPOSE 5173

CMD ["serve", "-s", "dist", "-l", "5173", "--single"]
    