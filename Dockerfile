FROM node:18-alpine as base
WORKDIR /app
COPY package*.json ./

FROM base as builder
RUN npm ci
# copy source files
COPY ./vite.config.js .
COPY ./index.html .
COPY ./src ./src
COPY ./public ./src

RUN pwd && ls
# Build files
RUN npm run build

FROM node:18-alpine as prod
WORKDIR /app
COPY ./dist .
RUN pwd && ls
EXPOSE 3000
CMD ["npx", "http-server", ".", "-p", "3000"]

FROM base as dev
ENV NODE_ENV development
RUN echo ${NODE_ENV}
RUN npm install
# link source files
COPY . .
EXPOSE 3000
# Watch files
CMD ["npm", "run", "dev"]
