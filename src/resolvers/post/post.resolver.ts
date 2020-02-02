import { PrismaService } from './../../services/prisma.service';
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
import { findManyCursor } from '../../common/find-many-cursor';
import { PostConnection } from '../../models/pagination/post.pagination';

@Resolver(of => Post)
export class PostResolver {
  constructor(private prisma: PrismaService) {}

  @Query(returns => PostConnection)
  async publishedPosts(
    @Args() { skip, after, before, first, last }: PaginationArgs
  ) {
    return await findManyCursor(
      args =>
        this.prisma.post.findMany({
          include: { author: true },
          where: {
            published: true
          },
          ...args
        }),
      { first, last, before, after }
    );
  }

  @Query(returns => [Post])
  userPosts(@Args() id: UserIdArgs) {
    return this.prisma.user
      .findOne({ where: { id: id.userId } })
      .posts({ where: { published: true } });

    // or
    // return this.prisma.posts.findMany({
    //   where: {
    //     published: true,
    //     author: { id: id.userId }
    //   }
    // });
  }

  @Query(returns => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findOne({ where: { id: id.postId } });
  }

  @ResolveProperty('author')
  async author(@Parent() post: Post) {
    return this.prisma.post.findOne({ where: { id: post.id } }).author();
  }
}
