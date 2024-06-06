FROM node:20-alpine as build
WORKDIR /usr/frontend/
COPY package*.json package-lock.json tsconfig*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN find ./dist -type f | xargs gzip -k

FROM nginx:1-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/frontend/dist /usr/share/nginx/html