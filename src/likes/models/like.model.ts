import { Field, ObjectType } from '@nestjs/graphql';
import { M2MModel } from '../../common/models/m2m.model';
import { Post } from '../../posts/models/post.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Like extends M2MModel {
  @Field(() => User, { nullable: true })
  user?: User | null;

  @Field(() => Post, { nullable: true })
  post?: Post | null;
}
