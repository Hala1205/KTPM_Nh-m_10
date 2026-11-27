FROM node:22-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY frontend/package*.json frontend/
RUN npm ci --prefix frontend
COPY backend backend
COPY database database
COPY frontend frontend
EXPOSE 5000 5001
CMD ["npm", "run", "dev", "--prefix", "frontend", "--", "--host", "0.0.0.0", "--port", "5000"]

FROM node:22-alpine AS build
WORKDIR /app
COPY frontend/package*.json frontend/
RUN npm ci --prefix frontend
COPY frontend frontend
RUN npm run build --prefix frontend
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY backend backend
COPY database database
COPY --from=build /app/frontend/dist frontend/dist
EXPOSE 5000
CMD ["node","backend/local-server.js"]
