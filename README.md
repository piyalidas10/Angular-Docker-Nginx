# Angular-Docker-Nginx
Angular 19 + Docker + Nginx for improves Performance


## 🚀Run Your App
**Option A: Docker only**
```
docker build -t angular-crud .
docker run -p 80:80 angular-crud
```

**Option B: Docker Compose**
```
docker-compose up --build
```

👉 Open:
```
http://localhost
```
## Changes needed
**📁 ✅ 1. Add Dockerfile (ROOT)**

Creating a basic docker image

We will optimize the final image size by using a multi-stages build : one stage will rely on the stable nodejs official image (node:lts-slim) to generate the Angular final bundle and one stage will rely on the official nginx image (nginx:stable) to serve the Angular app files. Create a Dockerfile (no extension) and paste this content :

Create a file named Dockerfile in your repo root:
```
# -------- Stage 1: Build Angular --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# -------- Stage 2: Nginx --------
FROM nginx:stable-alpine

# Remove default config
RUN rm -rf /etc/nginx/conf.d/*

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy Angular build output
COPY --from=build /app/dist/angular-crud /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```
👉 🔴 IMPORTANT  
If your dist folder is different, update this line:
```
COPY --from=build /app/dist/YOUR_PROJECT_NAME /usr/share/nginx/html
```

**📁 ✅ 2. Add nginx.conf (ROOT)**

Create nginx.conf in root:
```
server {
    listen 80;

    server_name localhost;

    root /usr/share/nginx/html;
    index index.html;

    # 🚀 Gzip compression
    gzip on;
    gzip_comp_level 6;
    gzip_types text/plain text/css application/json application/javascript application/xml+rss;

    # 🚀 Cache static assets (1 year)
    location ~* \.(js|css|png|jpg|jpeg|gif|svg|woff2?|ttf|ico)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # 🚀 Do NOT cache index.html
    location = /index.html {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }

    # 🚀 Angular routing fix
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

**📁 ✅ 3. Add .dockerignore**

Create .dockerignore:
```
node_modules
dist
.git
.gitignore
Dockerfile
docker-compose.yml
README.md
```

**📁 ✅ 4. (Optional but Recommended) docker-compose.yml**
```
version: '3.8'

services:
  angular-app:
    build: .
    container_name: angular-crud-app
    ports:
      - "80:80"
    restart: always
```

**⚙️ ✅ 5. Update angular.json (VERY IMPORTANT)**

Find production config and ensure:
```
"production": {
  "optimization": true,
  "outputHashing": "all",
  "sourceMap": false,
  "namedChunks": false,
  "extractLicenses": true,
  "vendorChunk": false,
  "buildOptimizer": true
}
```
