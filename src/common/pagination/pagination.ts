import { Field, ObjectType, Int } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { PageInfo } from './page-info.model';

export default function Paginated<TItem>(TItemClass: Type<TItem>) {
  @ObjectType(`${TItemClass.name}Edge`)
  abstract class EdgeType {
    @Field(() => String)
    cursor: string;

    @Field(() => TItemClass)
    node: TItem;
  }

  // `isAbstract` decorator option is mandatory to prevent registering in schema
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [EdgeType], { nullable: true })
    edges: Array<EdgeType>;

    // @Field((type) => [TItemClass], { nullable: true })
    // nodes: Array<TItem>;

    @Field(() => PageInfo)
    pageInfo: PageInfo;

    @Field(() => Int)
    totalCount: number;
  }
  return PaginatedType;
}
