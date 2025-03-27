import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PostIdArgs {
  @IsNotEmpty()
  @Field()
  postId: string;
}
