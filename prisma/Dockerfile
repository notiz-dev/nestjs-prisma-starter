FROM node:12
RUN openssl version -v
RUN uname -a
RUN echo $POSTGRESQL_URL

# Create app directory
WORKDIR /usr/src/app

RUN npm install -g prisma2 --unsafe-perm

ADD ./ ./prisma/

EXPOSE 5555
CMD [ "prisma2", "dev"]