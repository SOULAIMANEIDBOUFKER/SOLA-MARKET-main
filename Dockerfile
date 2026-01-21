FROM node:20-alpine

WORKDIR /app

# 1) Install root deps (because your deps are in root package.json)
COPY package*.json ./
RUN npm ci --omit=dev

# 2) Copy backend only (no frontend build)
COPY backend ./backend

ENV NODE_ENV=production

# Koyeb uses process.env.PORT at runtime
EXPOSE 8000

CMD ["node", "backend/server.js"]
