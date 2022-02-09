import { ObjectType, registerEnumType, HideField } from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  role: Role;
  posts: Post[];
  @HideField()
  password: string;
}
