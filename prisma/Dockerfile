FROM node:12
RUN openssl version -v
RUN uname -a
RUN echo $DATABASE_URL

# Create app directory
WORKDIR /app

# Install @prisma/cli for the migration
RUN npm install -g @prisma/cli --unsafe-perm

# Copy schema and migration folder
ADD ./ ./prisma/

CMD [ "prisma", "migrate", "up", "--experimental"]
