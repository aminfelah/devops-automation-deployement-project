FROM node:14

WORKDIR /amin-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start