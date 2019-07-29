import { PhotonService } from './../../services/photon.service';
import { PaginationArgs } from './../../models/args/pagination-args';
import { PostIdArgs } from './../../models/args/postid-args';
import { UserIdArgs } from '../../models/args/userid-args';
import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Args
} from '@nestjs/graphql';
import { Post } from './../../models/post';

@Resolver(of => Post)
export class PostResolver {
  constructor(private photon: PhotonService) {}

  @Query(returns => [Post])
  publishedPosts(@Args() { skip, after, before, first, last }: PaginationArgs) {
    return this.photon.posts.findMany({
      where: { published: true },
      skip,
      after,
      before,
      first,
      last
    });
  }

  @Query(returns => [Post])
  userPosts(@Args() id: UserIdArgs) {
    return this.photon.users
      .findOne({ where: { id: id.userId } })
      .posts({ where: { published: true } });

    // or
    // return this.photon.posts.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(returns => Post)
  async post(@Args() id: PostIdArgs) {
    return this.photon.posts.findOne({ where: { id: id.postId } });
  }

  @ResolveProperty('author')
  async author(@Parent() post: Post) {
    return this.photon.posts.findOne({ where: { id: post.id } }).author();
  }
}
