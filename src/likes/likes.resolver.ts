import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { Like } from './models/like.model';
import { LikesService } from './likes.service';
import { LikeIdArgs } from './dto/likeId.args';
import { LikeCountResponse } from './dto/countLike.args';
import { UserEntity } from '../common/decorators/user.decorator';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { PostIdArgs } from './args/post-id.args';

@Resolver(() => Like)
export class LikesResolver {
  constructor(private likesService: LikesService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Like)
  async createLike(@UserEntity() user: User, @Args('data') data: LikeIdArgs) {
    return this.likesService.createLike(user.id, data);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => String)
  async deleteLike(@UserEntity() user: User, @Args('data') data: LikeIdArgs) {
    return this.likesService.deleteLike(user.id, data);
  }

  @Query(() => LikeCountResponse)
  likeCount(@Args('id') id: PostIdArgs) {
    return this.likesService.countLike(id);
  }
}
