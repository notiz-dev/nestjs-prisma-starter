import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LikeCountResponse {
  @Field()
  postId: string;

  @Field()
  likeCount: number;
}
