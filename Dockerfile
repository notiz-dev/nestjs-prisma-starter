FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g prisma2 --unsafe-perm

COPY ./prisma/schema.prisma ./

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

# Install app dependencies
RUN npm install --unsafe-perm

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]