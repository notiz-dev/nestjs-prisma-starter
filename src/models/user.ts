import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Post } from './post';
import { Model } from './model';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends Model {
  email: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  posts: Post[];
  password: string;
}
