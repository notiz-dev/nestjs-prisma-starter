# Instructions

#### Step 1

Setup [Prisma CLI](https://www.prisma.io/docs/1.21/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

```bash
npm install -g prisma
```

#### Step 2

Install Docker and start Prisma and the connected database by running the following command: 

```bash
docker-compose up -d
```

#### Step 3

To deploy the Prisma schema run: 

```bash
prisma deploy
```

Playground of Prisma is available here: http://localhost:4466/

#### Step 4

To start the NestJS Server run:

```bash
npm run start
```

Playground for the NestJS Server is available here: http://localhost:3000/graphql

# Update Schema

## Prisma

Update the Prisma schema `prisma/datamodel.prisma` and after that run the following two commands:

```bash
prisma deploy
```

`prisma deploy` will update the database and for each deploy `prisma generate` is executed. This will generate the latest Prisma Client to access Prisma from your resolvers. 

## NestJS

### Schema
Add or update the `*.graphql` schema with Queries or Mutations. 

For example:

```
# Add user Query to user.graphql
type Query {
  ...
  user(id: ID): User
  ...
}
```

After starting NestJS this Query is available in the Playground, but will fail at the moment. This will be fixed in the next step. Add a new resolver function.

### Resolver

To implement the new query, a new resolver function needs to be added to `users.resolver.ts`.

```
@Query('user')
async getUser(@Args() args): Promise<User> {
  return await this.prisma.client.user(args);
}
```

Restart the NestJS server and this time the Query to fetch a `user` should work.
