# build stage
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --ignore-scripts
RUN yarn add vue-select@beta

COPY . .

RUN npm run build

# production stage
FROM nginx:stable-alpine AS production-stage

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

RUN mkdir -p /var/cache/nginx /var/run
RUN chown nonroot:nonroot /var/cache/nginx /var/run

USER nonroot

CMD ["nginx", "-g", "daemon off;"]
