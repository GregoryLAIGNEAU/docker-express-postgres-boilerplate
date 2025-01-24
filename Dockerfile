FROM node:22-alpine
ARG NODE_ENV
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN if [ "$NODE_ENV" = "production" ]; \
    then npm install --production --silent; \
    else npm install; \
    fi
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["npm", "start"]
