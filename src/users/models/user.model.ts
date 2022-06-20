import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { app_user_roles } from '@prisma/client';

registerEnumType(app_user_roles, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  @Field(() => app_user_roles)
  role: app_user_roles;
  posts: Post[];
  @HideField()
  password: string;
}