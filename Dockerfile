From node:14

WORKDIR /usr/src/app

COPY . .

RUN npm install-client
RUN npm install-api

EXPOSE 3000

CMD ["node", "start"]