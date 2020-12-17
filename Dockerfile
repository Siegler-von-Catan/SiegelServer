FROM node:12
WORKDIR /usr/src/siegelserver
COPY package*.json ./

RUN npm ci
COPY . .
RUN npm run build
RUN npm run download_static
EXPOSE 8080
CMD node dist/index.js
