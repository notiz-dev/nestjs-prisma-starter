import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.model';
import { Model } from './model.model';

@ObjectType()
export class Post extends Model {
  title: string;
  content: string;
  published: boolean;
  author: User;
}
