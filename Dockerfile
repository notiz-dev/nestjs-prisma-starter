FROM node:12 AS builder

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update \
    && apt-get install -y build-essential python

# Create app directory
WORKDIR /app

RUN npm install -g @prisma/cli --unsafe-perm

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY tsconfig*.json ./
COPY src ./src
# Copy for swagger and graphql plugin
COPY nest-cli.json ./nest-cli.json

RUN npm run build

# TODO use node-alpine when supported by prisma2 https://github.com/prisma/prisma2/issues/702
FROM node:12
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]
