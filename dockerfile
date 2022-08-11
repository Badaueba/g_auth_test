FROM node:16.15.0

WORKDIR /

# install node packages
# RUN yarn install
COPY ./package*.json ./

RUN npm i yarn -g --force


COPY . .

CMD [ "yarn", "start:dev" ]