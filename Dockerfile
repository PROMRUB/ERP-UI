FROM node:21-alpine3.18 as builder


WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
# COPY package-lock.json ./
RUN npm install -f

COPY . .

# Building app
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
