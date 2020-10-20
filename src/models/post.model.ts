import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { BaseModel } from './base.model';

@ObjectType()
export class Post extends BaseModel {
  title: string;
  content: string;
  published: boolean;
  author: User;
}
