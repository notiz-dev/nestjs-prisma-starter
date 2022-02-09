import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
  @Field()
  @IsNotEmpty()
  content: string;

  @Field()
  @IsNotEmpty()
  title: string;
}
