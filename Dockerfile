# Dockerfile

FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN mkdir -p public/uploads

COPY . .

EXPOSE 3000

CMD ["node", "app/server.js"]
