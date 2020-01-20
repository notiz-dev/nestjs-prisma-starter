import { Field, InputType } from 'type-graphql';
import { OrderDirection } from './order-direction';

@InputType()
export class Order {
  @Field(type => OrderDirection)
  direction: OrderDirection;
}
