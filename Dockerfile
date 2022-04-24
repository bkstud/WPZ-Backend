
FROM node:latest

WORKDIR /home/project
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 
RUN npm config set scripts-prepend-node-path auto

WORKDIR /app
CMD ["./start.sh"]