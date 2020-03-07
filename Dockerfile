FROM node:12
RUN openssl version -v
RUN uname -a

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update \
    && apt-get install -y build-essential python

# Create app directory
WORKDIR /usr/src/app

ARG POSTGRESQL_URL
ENV POSTGRESQL_URL "$POSTGRESQL_URL"

RUN npm install -g prisma2 --unsafe-perm

ADD ./prisma/schema.prisma ./

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json ./

# Install app dependencies
RUN npm install --unsafe-perm

ADD . .

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]