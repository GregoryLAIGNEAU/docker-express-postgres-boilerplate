FROM node:22-alpine AS base

RUN apk add --no-cache curl

WORKDIR /app

EXPOSE 5000

USER node

FROM base AS development

COPY package*.json ./

USER root

RUN --mount=type=cache,target=/root/.npm npm ci

USER node

COPY . ./

CMD ["npm", "run", "dev"]

FROM base AS production

COPY package*.json ./

USER root

RUN --mount=type=cache,target=/root/.npm npm ci --omit=development

USER node

COPY . ./

CMD ["npm", "start"]
