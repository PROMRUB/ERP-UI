FROM node:16.13.0-alpine3.14 as builder


WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
# COPY yarn.lock ./
# COPY ./node_modules ./node_modules
RUN npm install --force

COPY . .

# Building app
RUN ["npm","run","build"]

#RUN yarn export

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=0 /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]