import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class PostIdArgs {
  @Field((type) => String)
  @IsNotEmpty()
  postId: string;
}
