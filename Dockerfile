# -------- Frontend Stage --------
FROM node:20 AS frontend

WORKDIR /app

COPY ui/package*.json ./ui/
RUN cd ui && npm install

COPY ui/ ./ui/
RUN cd ui && npm run build

# -------- Backend Stage --------
FROM python:3.10-slim AS backend

# Install OS-level dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY src/requirements.txt ./src/requirements.txt
RUN pip install --upgrade pip && pip install -r ./src/requirements.txt

# Copy backend
COPY src/ ./src/

# Copy frontend build result
COPY --from=frontend /app/ui/.next /app/ui/.next
COPY --from=frontend /app/ui/public /app/ui/public
COPY --from=frontend /app/ui/package*.json /app/ui/
COPY --from=frontend /app/ui/node_modules /app/ui/node_modules

# Install serve (for frontend static hosting)
RUN npm install -g serve

EXPOSE 1080
EXPOSE 3000

# Run both FastAPI and frontend using sh
CMD sh -c "uvicorn src.app.main:app --host 0.0.0.0 --port 1080 & serve -s ui/.next -l 3000 && wait"
