import { registerEnumType } from 'type-graphql';

export enum OrderDirection {
  // Specifies an ascending order for a given `orderBy` argument.
  ASC = 'asc',
  // Specifies a descending order for a given `orderBy` argument.
  DESC = 'desc'
}

registerEnumType(OrderDirection, {
  name: 'OrderDirection',
  description:
    'Possible directions in which to order a list of items when provided an `orderBy` argument.'
});
