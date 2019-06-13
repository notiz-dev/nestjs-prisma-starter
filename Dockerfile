FROM node:10

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install necessary tools for bcrypt to run in docker before npm install
RUN apt-get update && apt-get install -y build-essential && apt-get install -y python

# Install app dependencies
RUN npm install

FROM node:10-alpine

# Create app directory
WORKDIR /usr/src/app

COPY --from=0 /usr/src/app .

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start:prod" ]