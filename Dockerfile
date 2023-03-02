
FROM node:16.17.0-alpine3.16

WORKDIR /public

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=5173 NODE_ENV=production

EXPOSE 5173

CMD [ "npm", "start"]