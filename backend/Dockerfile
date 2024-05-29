FROM node:20.13-alpine as build

EXPOSE ${PORT}

WORKDIR /usr/backend/

COPY package*.json tsconfig.json tsconfig.build.json ./

RUN npm install

COPY . .

FROM node:20.13-alpine

WORKDIR /usr/backend/

COPY --from=build /usr/backend /usr/backend

CMD npm run start:dev:docker