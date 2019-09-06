FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g prisma2 --unsafe-perm

COPY ./ ./prisma/

CMD [ "prisma2", "dev"]