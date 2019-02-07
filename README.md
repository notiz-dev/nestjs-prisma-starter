# Instructions

## Overview
* [Prisma Setup](#prisma-setup)
* [Start NestJS Server](#start-nestjs-server)
* [Update Schema](#update-schema)
* [Deploy to Heroku](#deploy-to-heroku)
* [Graphql Client](#graphql-client)

## Prisma Setup

### 1. Install Prisma

Setup [Prisma CLI](https://www.prisma.io/docs/1.21/get-started/01-setting-up-prisma-new-database-TYPESCRIPT-t002/)

```bash
npm install -g prisma
```

### 2. Install Docker

Install Docker and start Prisma and the connected database by running the following command: 

```bash
docker-compose up -d
```

### 3. Deploy Prisma

To deploy the Prisma schema run: 

```bash
prisma deploy
```

Playground of Prisma is available here: http://localhost:4466/

**[⬆ back to top](#overview)**

## Start NestJS Server

To start the NestJS Server run:

```bash
npm run start
```

Playground for the NestJS Server is available here: http://localhost:3000/graphql

**[⬆ back to top](#overview)**

## Update Schema

### Prisma - Database Schema

Update the Prisma schema `prisma/datamodel.prisma` and after that run the following two commands:

```bash
prisma deploy
```

`prisma deploy` will update the database and for each deploy `prisma generate` is executed. This will generate the latest Prisma Client to access Prisma from your resolvers. 

**[⬆ back to top](#overview)**

### NestJS - Api Schema

#### Api Schema
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

#### Resolver

To implement the new query, a new resolver function needs to be added to `users.resolver.ts`.

```
@Query('user')
async getUser(@Args() args): Promise<User> {
  return await this.prisma.client.user(args);
}
```

Restart the NestJS server and this time the Query to fetch a `user` should work.

**[⬆ back to top](#overview)**

## Deploy to Heroku
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/fivethree-team/nestjs-prisma-client-starter)

**[⬆ back to top](#overview)**

## Graphql Client

A graphql client is necessary to consume the graphql api provided by the NestJS Server. 

Checkout [Apollo](https://www.apollographql.com/) a popular graphql client which offers several clients for React, Angular, Vue.js, Native iOS, Native Android and more.

### Angular

#### Setup

To start using [Apollo Angular](https://www.apollographql.com/docs/angular/basics/setup.html) simply run in an Angular and Ionic project:

```bash
ng add apollo-angular
```

`HttpLink` from apollo-angular requires the `HttpClient`. Therefore, you need to add the `HttpClientModule` to the `AppModule`:

```typescript
imports: [BrowserModule,
    HttpClientModule,
    ...,
    GraphQLModule],
```
You can also add the `GraphQLModule` in the `AppModule` to make `Apollo` available in your Angular App.

You need to set the URL to the NestJS Graphql Api. Open the file `src/app/graphql.module.ts` and update `uri`:

```typescript
const uri = 'http://localhost:3000/graphql';
```

To use Apollo-Angular you can inject `private apollo: Apollo` into the constructor of a page, component or service.

**[⬆ back to top](#overview)**

#### Queries

To execute a query you can use: 

```typescript
this.apollo.query({query: YOUR_QUERY});

# or

this.apollo.watchQuery({
  query: YOUR_QUERY
}).valueChanges;
```

Here is an example how to fetch your profile from the NestJS Graphql Api:

```typescript
const CurrentUserProfile = gql`
  query CurrentUserProfile {
    me {
      id
      email
      name
    }
}`;


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data = this.apollo.watchQuery({
      query: CurrentUserProfile
    }).valueChanges;
  } 
}
```

Use the `AsyncPipe` and [SelectPipe](https://www.apollographql.com/docs/angular/basics/queries.html#select-pipe) to unwrap the data Observable in the template:

```html
<div *ngIf="data | async | select: 'me' as me">
    <p>Me id: {{me.id}}</p>
    <p>Me email: {{me.email}}</p>
    <p>Me name: {{me.name}}</p>
</div>
```

Or unwrap the data using [RxJs](https://www.apollographql.com/docs/angular/basics/queries.html#rxjs).

This will end up in an `GraphQL error` because `Me` is protected by an `@UseGuards(GqlAuthGuard)` and requires an `Bearer TOKEN`.
Please refer to the [Authentication](#authentication) section.

**[⬆ back to top](#overview)**

#### Mutations

To execute a mutation you can use: 

```typescript
this.apollo.mutate({
  mutation: YOUR_MUTATION
});
```

Here is an example how to login into your profile using the `login` Mutation:

```typescript
const Login = gql`
  mutation Login {
  login(email: "test@example.com", password: "pizzaHawaii") {
    token
    user {
      id
      email
      name
    }
  }
}`;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  data: Observable<any>;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.data = this.apollo.mutate({
      mutation: Login
    });
  }

}
``` 

**[⬆ back to top](#overview)**

#### Subscriptions

To execute a subscription you can use: 

```typescript
this.apollo.subscribe({
  query: YOUR_SUBSCRIPTION_QUERY
})
```

**[⬆ back to top](#overview)**

#### Authentication

To authenticate your requests you have to add your `TOKEN` you receive on `signup` and `login` [mutation](#mutations) to each request which is protected by the `@UseGuards(GqlAuthGuard)`.

Because the apollo client is using `HttpClient` under the hood you are able to simply use an `Interceptor` to add your token to the requests.

Create the following class: 

```typescript
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = 'YOUR_TOKEN'; // get from local storage
        if (token !== undefined) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }
}
```

Add the Interceptor to the `AppModule` providers like this:

```typescript
providers: [
    ...
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    ...
  ]
```

After you configured the Interceptor and retrieved the `TOKEN` from storage your request will succeed on resolvers with `@UseGuards(GqlAuthGuard)`.

**[⬆ back to top](#overview)**
