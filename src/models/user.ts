import { Field, ObjectType } from 'type-graphql';
import { Post } from './post';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  registeredAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field(type => [Post])
  posts: Post[];

  password: string;
}
