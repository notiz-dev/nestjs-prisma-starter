import { Field, ObjectType, registerEnumType } from 'type-graphql';

@ObjectType({ isAbstract: true })
export abstract class Model {
  @Field(type => String)
  id: string;

  @Field(type => Date)
  createdAt: Date;

  @Field(type => Date)
  updatedAt: Date;
}
