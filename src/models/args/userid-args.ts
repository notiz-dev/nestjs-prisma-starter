import { Field, ArgsType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ArgsType()
export class UserIdArgs {
  @Field((type) => String)
  @IsNotEmpty()
  userId: string;
}
