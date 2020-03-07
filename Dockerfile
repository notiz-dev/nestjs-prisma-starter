FROM node:12

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update \
    && apt-get install -y build-essential python

# Create app directory
WORKDIR /app

ARG POSTGRESQL_URL
ENV POSTGRESQL_URL "$POSTGRESQL_URL"

RUN npm install -g prisma2 --unsafe-perm

ADD ./prisma/schema.prisma ./

# A wildcard is used to ensure both package.json AND package-lock.json are copied
ADD package*.json ./

# Install app dependencies
RUN npm install

ADD tsconfig*.json ./
ADD src ./src

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]