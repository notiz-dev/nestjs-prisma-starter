import {
  ObjectType,
  registerEnumType,
  HideField,
  Field,
} from '@nestjs/graphql';
import { Post } from 'src/posts/models/post.model';
import { BaseModel } from 'src/common/models/base.model';
import { Role } from '@prisma/client';

registerEnumType(Role, {
  name: 'Role',
  description: 'User role',
});

@ObjectType()
export class User extends BaseModel {
  email: string;
  firstname?: string;
  lastname?: string;
  @Field(() => Role)
  role: Role;
  posts: Post[];
  @HideField()
  password: string;
}