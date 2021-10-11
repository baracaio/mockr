FROM nginx:1.21.3-alpine

RUN addgroup -S www && adduser -S www -G www

COPY ./build/nginx/config /

COPY . /app