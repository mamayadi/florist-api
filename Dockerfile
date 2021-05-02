FROM node:latest

ARG HTTP_PORT
WORKDIR /app
RUN npm i -g nodemon
COPY package.json /app/package.json
RUN npm i

EXPOSE $HTTP_PORT
