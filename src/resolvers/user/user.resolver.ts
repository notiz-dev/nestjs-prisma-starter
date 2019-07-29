import { Post } from './../../models/post';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from './../../models/user';

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query(returns => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @ResolveProperty('posts')
  posts(@Parent() author: User): Promise<Post[]> {
    return this.prisma.client.user({ id: author.id }).posts();
  }
}
