FROM node:18.14-alpine3.16
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
CMD [ "npm", "run", "start:dev" ]