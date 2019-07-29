import { Field, ObjectType } from 'type-graphql';
import { User } from './user';

@ObjectType()
export class Post {
  @Field()
  id: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  title: string;

  @Field()
  published: boolean;

  @Field(type => User)
  author: User;
}
