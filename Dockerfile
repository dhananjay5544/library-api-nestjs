FROM node:latest AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

RUN yarn run build

# final stage build =>
FROM node:current-alpine3.12

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]
