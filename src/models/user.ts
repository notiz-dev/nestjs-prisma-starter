import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  password: string;
}
