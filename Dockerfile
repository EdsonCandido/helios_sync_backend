FROM node:20-slim AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


## colocando aplicação em prd
FROM node:20-slim AS production

WORKDIR /app

RUN npm install --production

COPY --from=build /app/build ./build

COPY .env ./

EXPOSE 3000

CMD ["node", "build/app.js"]