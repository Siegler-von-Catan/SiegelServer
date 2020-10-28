FROM node:12
WORKDIR /usr/src/siegelserver
COPY package*.json ./

RUN npm ci --only=production
COPY . .
COPY ./.env.docker ./.env
RUN npm run build:prod
RUN npm run install_static
EXPOSE 8080
CMD node dist/index.js