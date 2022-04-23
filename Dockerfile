
FROM node:latest

WORKDIR /home/node

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

WORKDIR /app
ENV NODE_PATH=/home/node/node_modules
CMD ["npm", "start"]