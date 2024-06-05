FROM node:20.13-alpine as build

EXPOSE ${PORT_FE}

WORKDIR /usr/frontend/

COPY package*.json tsconfig.json tsconfig.node.json vite.config.ts ./

RUN npm install

COPY . .

FROM node:20.13-alpine

WORKDIR /usr/frontend/

COPY --from=build /usr/frontend /usr/frontend

CMD npm run dev