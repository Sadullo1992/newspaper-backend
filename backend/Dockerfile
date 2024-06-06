FROM node:20-alpine as base
WORKDIR /usr/backend/
COPY package*.json tsconfig*.json ./

FROM base as dev
RUN npm install
COPY . .
RUN npm run build

FROM base as prod
RUN npm install --omit=dev

FROM base
COPY --from=dev /usr/backend/dist ./dist
COPY --from=prod /usr/backend/node_modules  ./node_modules

CMD npm run start:dev