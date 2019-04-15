# Nest Prisma Starter

## Nest
Run Nest Server in Development mode:

```bash
npm run start

# watch mode
npm run start:dev
```

Run Nest Server in Production mode:

```bash
npm run start:prod
```

## Rest

[RESTful API](http://localhost:3000/api) documentation available with Swagger.

## Graphql

Generate typings for the Nest Server:

```bash
npm run typings
```

Typings are generated to `src/generated/graphql.ts`.

## Prisma

Start the Prisma server and database:

```bash
docker-compose up -d
```

Deploy the prisma schema:

```bash
prisma deploy
```

Now you have access to the [Prisma Admin](http://localhost:4466/_admin).
Prisma Admin is seeded with two users, see `prisma/seed.graphql`.