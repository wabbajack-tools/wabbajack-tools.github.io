FROM node:13
ENV NODE_ENV production
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn --silent && mv node_modules ../
COPY . .
EXPOSE 3000
CMD yarn run start
