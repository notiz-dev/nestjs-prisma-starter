import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../../guards/auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { PrismaService } from '../../prisma/prisma.service';
import { Roles } from '../../decorators/roles.decorator';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from '../../prisma/client';
import { UpdateMePayload } from '../../types/types';

@Resolver()
@UseGuards(GqlAuthGuard, RolesGuard)
export class UsersResolver {
  constructor(private readonly prisma: PrismaService) { }

  @Query('me')
  @Roles('admin', 'user')
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @Query('users')
  @Roles('admin')
  async users(): Promise<User[]> {
    return this.prisma.client.users();
  }

  @Mutation('updateMe')
  async updateMe(@UserEntity() user: User, @Args() args: UpdateMePayload): Promise<User> {
    return await this.prisma.client.updateUser({
      data: args,
      where: { id: user.id },
    });
  }

}
