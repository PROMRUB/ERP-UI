# FROM node:21-alpine3.18 as builder


# WORKDIR /usr/src/app

# # Installing dependencies
# COPY package*.json ./
# # COPY package-lock.json ./
# RUN npm install -f

# COPY . .

# # Building app
# RUN npm run build
# EXPOSE 3000
# CMD ["npm", "start"]
FROM node:lts-alpine AS deps

WORKDIR /opt/app
# COPY package.json yarn.lock ./
COPY package.json ./
RUN npm install --frozen-lockfile -f

FROM node:lts-alpine AS builder

ENV NODE_ENV=production
WORKDIR /opt/app
COPY . .
COPY --from=deps /opt/app/node_modules ./node_modules
RUN npm run build

FROM node:lts-alpine AS runner

WORKDIR /opt/app
ENV NODE_ENV=production
COPY --from=builder /opt/app/next.config.js ./
COPY --from=builder /opt/app/public ./public
COPY --from=builder /opt/app/.next ./.next
COPY --from=builder /opt/app/node_modules ./node_modules
CMD ["node_modules/.bin/next", "start"]