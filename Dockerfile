FROM node:22-alpine AS frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM node:22-alpine AS backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
COPY backend/package*.json ./
RUN npm install --omit=dev
COPY --from=backend /app/backend/dist ./dist
COPY --from=frontend /app/frontend/dist ./public
EXPOSE 3001
CMD ["node", "dist/main.js"]
