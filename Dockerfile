
FROM node:19.5.0-alpine as builder


WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
# COPY yarn.lock ./
# COPY ./node_modules ./node_modules
RUN npm install --force

COPY . .

# Building app
RUN ["npm","run","build"]

EXPOSE 3000
EXPOSE 80
CMD ["npm", "start"]

#RUN yarn export

# FROM nginx:alpine
# WORKDIR /usr/share/nginx/html
# COPY --from=0 /usr/src/app/out /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d


# CMD ["nginx", "-g", "daemon off;"]
