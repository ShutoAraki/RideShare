# base image
FROM node:11.10.1-alpine as client

# install chrome
RUN echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk add --no-cache \
    chromium@edge \
    harfbuzz@edge \
    nss@edge \
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY client/package.json /usr/src/app/package.json
COPY client/package-lock.json /usr/src/app/package-lock.json
RUN npm install

# copy the client directory into the container
COPY client/. /usr/src/app

RUN ng build

FROM nginx:1.15.9-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx/include.websocket /etc/nginx/app/include.websocket
COPY nginx/include.forwarded /etc/nginx/app/include.forwarded
COPY nginx/dev.conf /etc/nginx/conf.d

COPY --from=client /usr/src/app/dist/client /app 
COPY ./media /media

