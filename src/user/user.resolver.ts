import { GqlAuthGuard } from './../guards/gql-auth.guard';
import { PrismaService } from './../prisma/prisma.service';
import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { User, Post } from './../generated/prisma-client';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './../decorators/user.decorator';

@Resolver('User')
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private prisma: PrismaService) {}

  @Query('me')
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @ResolveProperty('posts')
  getPosts(@Parent() author: User): Promise<Post[]> {
    return this.prisma.client.user({ id: author.id }).posts();
  }
}
