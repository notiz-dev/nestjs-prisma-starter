import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  @Field((type) => Int, { nullable: true })
  skip?: number;

  @Field((type) => String, { nullable: true })
  after?: string;

  @Field((type) => String, { nullable: true })
  before?: string;

  @Field((type) => Int, { nullable: true })
  first?: number;

  @Field((type) => Int, { nullable: true })
  last?: number;
}
