FROM node:alpine
RUN apk add --no-cache --update \
    python \
    python-dev \
    py-pip \
    build-base \
    git

WORKDIR /usr/src/app
# Bundle APP files
COPY package*.json ./
RUN yarn --production
COPY . .

# Install app dependencies
ENV DUCOR_EOS_ORACLE_PRIVATEKEY=
ENV DUCOR_ETH_ORACLE_PRIVATEKEY=
ENV DUCOR_EOS_ORACLE_ACCOUNT=workshop2221
ENV DUCOR_API_PORT=3091
ENV DUCOR_EOS_WATCH_DELAY=10000
ENV DUCOR_EOS_CHAINID=038f4b0fc8ff18a4f0842a8f0564611f6e96e8535901dd45e43ac8691a1c4dca
ENV DUCOR_EOS_ENDPOINT=http://peer.test.alohaeos.com:8888
ENV DUCOR_EOS_MASTER_ORACLE=ducormaster
ENV DUCOR_EOS_RETHINKHOST=localhost
ENV DUCOR_EOS_RETHINKPORT=28015
ENV DUCOR_EOS_RETHINKDATABASE=ducor
ENV DUCOR_EOS_RETHINKTABLE=eos_requests
ENV DUCOR_ETH_MASTER_ADDRESS=0x85a84691547b7ccf19d7c31977a7f8c0af1fb25a
ENV DUCOR_ETH_PROVIDER=ws://localhost:8545
ENV DUCOR_ETH_ORACLE_ACCOUNT=0xdf08f82de32b8d460adbe8d72043e3a7e25a3b39

# Expose the listening port of your app
EXPOSE $DUCOR_API_PORT

CMD [ "yarn", "start" ]