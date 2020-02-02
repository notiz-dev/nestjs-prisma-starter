import { Field, InputType } from 'type-graphql';
import { Order } from '../../common/order/order';

import { registerEnumType } from 'type-graphql';

export enum PostOrderField {
  CREATED_AT = 'CREATED_AT',
  UPDATED_AT = 'UPDATED_AT'
}

registerEnumType(PostOrderField, {
  name: 'PostOrderField',
  description: 'Properties by which post connections can be ordered.'
});

@InputType()
export class PostOrder extends Order {
  @Field(type => PostOrderField)
  field: PostOrderField;
}
