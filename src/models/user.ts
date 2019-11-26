import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Post } from './post';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field({ name: 'registeredAt' })
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field()
  email: string;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field(type => Role)
  role: Role;

  @Field(type => [Post])
  posts: Post[];

  password: string;
}

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER'
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role'
});
