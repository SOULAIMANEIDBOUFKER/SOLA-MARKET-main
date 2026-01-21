# ---------- 1) Build Frontend ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build


# ---------- 2) Build Backend ----------
FROM node:20-alpine AS backend-build
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/ ./


# ---------- 3) Final Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy backend
COPY --from=backend-build /app/backend ./backend

# Copy frontend dist into /frontend/dist (so your server.js can serve it)
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

# Install backend deps already installed in backend-build, so nothing else here
# Expose port (Koyeb will set PORT env at runtime)
EXPOSE 8000

CMD ["node", "backend/server.js"]
