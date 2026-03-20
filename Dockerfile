# -------- Build Stage --------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build -- --configuration production

# -------- Nginx Stage --------
FROM nginx:stable-alpine

# 👉 /usr/share/nginx/html/ is inside the Docker container, NOT on your local machine.
RUN rm -rf /usr/share/nginx/html/*

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/angular-crud/browser/ /usr/share/nginx/html/

# 🔥 IMPORTANT FIX
RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]