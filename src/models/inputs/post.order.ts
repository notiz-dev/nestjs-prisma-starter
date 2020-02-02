import { Field, InputType } from 'type-graphql';
import { Order } from '../../common/order/order';

import { registerEnumType } from 'type-graphql';
import { OrderDirection } from '../../common/order/order-direction';

export enum PostOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt'
}

registerEnumType(PostOrderField, {
  name: 'PostOrderField',
  description: 'Properties by which post connections can be ordered.'
});

// TODO try using this input type with prisma so the user knows it can only be ordered by one value
@InputType()
export class PostOrder extends Order {
  @Field(type => PostOrderField)
  field: PostOrderField;
}

@InputType({
  isAbstract: true
})
export class PostOrderByInput {
  @Field(_type => OrderDirection, {
    nullable: true
  })
  id?: OrderDirection | null;

  @Field(_type => OrderDirection, {
    nullable: true
  })
  createdAt?: OrderDirection | null;

  @Field(_type => OrderDirection, {
    nullable: true
  })
  updatedAt?: OrderDirection | null;

  @Field(_type => OrderDirection, {
    nullable: true,
    description: undefined
  })
  published?: OrderDirection | null;

  @Field(_type => OrderDirection, {
    nullable: true,
    description: undefined
  })
  title?: OrderDirection | null;

  @Field(_type => OrderDirection, {
    nullable: true,
    description: undefined
  })
  content?: OrderDirection | null;
}
