FROM node:18-alpine as base
WORKDIR /app
COPY ./package*.json ./

FROM base as builder
RUN npm ci
# copy source files
COPY ./vite.config.js .
COPY ./index.html .
COPY ./src ./src
COPY ./public ./public
COPY ./tailwind.config.cjs .
COPY ./postcss.config.cjs .
# Build files
RUN npm run build

FROM node:18-alpine as prod
RUN mkdir -p /home/node/app/dist && chown -R node:node /home/node/app
WORKDIR /home/node/app
USER node
COPY --chown=node:node --from=builder /app/dist ./dist
# copy the server + install express to serve public folder
COPY --chown=node:node ./server/server.js .
COPY --chown=node:node ./server/package*.json .
RUN npm ci
EXPOSE 3000
CMD ["node", "server.js"]

FROM base as dev
ENV NODE_ENV development
RUN echo ${NODE_ENV}
RUN npm install
# link source files
COPY . .
EXPOSE 3000
# Watch files
CMD ["npm", "run", "dev"]
