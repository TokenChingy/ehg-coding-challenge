From node:14

WORKDIR /usr/src/app

COPY . .

RUN npm run install-client
RUN npm run install-api

EXPOSE 3000

CMD ["npm", "start"]