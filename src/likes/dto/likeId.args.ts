import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class LikeIdArgs {
  @Field()
  @IsNotEmpty()
  postId: string;
}
