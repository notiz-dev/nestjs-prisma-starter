import { GqlAuthGuard } from './../../auth/auth.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { User } from './../../generated/prisma-client';
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'auth/user.decorator';
import { UpdateMePayload } from 'types/types';

@Resolver()
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) {}

  @Query('me')
  @UseGuards(GqlAuthGuard)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Mutation('updateMe')
  @UseGuards(GqlAuthGuard)
  async updateMe(
    @UserEntity() user: User,
    @Args() args: UpdateMePayload
  ): Promise<User> {
    return await this.prisma.client.updateUser({
      data: args,
      where: { id: user.id }
    });
  }
}
