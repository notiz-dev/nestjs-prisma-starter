import { Field, ArgsType, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationArgs {
  skip?: number;

  after?: string;

  before?: string;

  first?: number;

  last?: number;
}
