FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install 

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "./dist/main"]

