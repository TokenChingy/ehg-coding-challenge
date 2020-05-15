FROM node:14-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm run install-client
RUN npm run install-api

EXPOSE 3000

ENTRYPOINT npm run start