import { PrismaService } from 'nestjs-prisma';
import {
  Resolver,
  Query,
  Parent,
  Mutation,
  Args,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/common/decorators/user.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) {}

  @Query(() => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @UserEntity() user: User,
    @Args('data') newUserData: UpdateUserInput
  ) {
    return this.userService.updateUser(user.id, newUserData);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async changePassword(
    @UserEntity() user: User,
    @Args('data') changePassword: ChangePasswordInput
  ) {
    return this.userService.changePassword(
      user.id,
      user.password,
      changePassword
    );
  }

  @ResolveField('posts')
  posts(@Parent() author: User) {
    return this.prisma.user.findUnique({ where: { id: author.id } }).posts();
  }
}
