import { PhotonService } from './../../services/photon.service';
import { Post } from './../../models/post';
import { GqlAuthGuard } from '../../guards/gql-auth.guard';
import { Resolver, Query, ResolveProperty, Parent } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from '../../decorators/user.decorator';
import { User } from './../../models/user';

@Resolver(of => User)
@UseGuards(GqlAuthGuard)
export class UserResolver {
  constructor(private photon: PhotonService) {}

  @Query(returns => User)
  async me(@UserEntity() user: User): Promise<User> {
    return user;
  }

  @ResolveProperty('posts')
  posts(@Parent() author: User) {
    return this.photon.users.findOne({ where: { id: author.id } }).posts();
  }
}
