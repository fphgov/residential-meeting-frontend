FROM node:20-alpine

WORKDIR /app

RUN npm install -g npm@9.6.6

COPY ./entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
