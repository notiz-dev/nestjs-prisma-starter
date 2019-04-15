import { Resolver, Query, Args } from '@nestjs/graphql';

@Resolver()
export class AppResolver {
  @Query()
  helloWorld(): string {
    return 'Hello World';
  }
  @Query()
  hello(@Args('name') name: string): string {
    return `Hello ${name}`;
  }
}
