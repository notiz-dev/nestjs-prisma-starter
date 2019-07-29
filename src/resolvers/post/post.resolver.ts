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
import { PrismaService } from '../../prisma/prisma.service';
import { Post } from './../../models/post';

@Resolver(of => Post)
export class PostResolver {
  constructor(private prisma: PrismaService) {}

  @Query(returns => [Post])
  publishedPosts(@Args() { skip, after, before, first, last }: PaginationArgs) {
    return this.prisma.client.posts({
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
    return this.prisma.client
      .user({ id: id.userId })
      .posts({ where: { published: true } });
  }

  @Query(returns => Post)
  post(@Args() id: PostIdArgs) {
    return this.prisma.client.post({ id: id.postId });
  }

  @ResolveProperty('author')
  author(@Parent() post: Post) {
    return this.prisma.client.post({ id: post.id }).author();
  }
}
