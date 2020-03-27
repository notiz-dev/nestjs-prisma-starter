import { PrismaService } from './../../services/prisma.service';
import { PaginationArgs } from '../../common/pagination/pagination-args';
import { PostIdArgs } from './../../models/args/postid-args';
import { UserIdArgs } from '../../models/args/userid-args';
import { Resolver, Query, Parent, Args, ResolveField } from '@nestjs/graphql';
import { Post } from './../../models/post';
import { findManyCursor } from '../../common/pagination/find-many-cursor';
import { PostOrder } from '../../models/inputs/post.order';
import { PostConnection } from 'src/models/pagination/post.pagination';

@Resolver((of) => Post)
export class PostResolver {
  constructor(private prisma: PrismaService) {}

  @Query((returns) => PostConnection)
  async publishedPosts(
    @Args() { skip, after, before, first, last }: PaginationArgs,
    @Args({ name: 'query', type: () => String, nullable: true })
    query: string,
    @Args({
      name: 'orderBy',
      type: () => PostOrder,
      nullable: true,
    })
    orderBy: PostOrder
  ) {
    return await findManyCursor(
      (args) =>
        this.prisma.post.findMany({
          include: { author: true },
          where: {
            published: true,
            title: { contains: query || '' },
          },
          orderBy: orderBy ? { [orderBy.field]: orderBy.direction } : null,
          ...args,
        }),
      { first, last, before, after }
    );
  }

  @Query((returns) => [Post])
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

  @Query((returns) => Post)
  async post(@Args() id: PostIdArgs) {
    return this.prisma.post.findOne({ where: { id: id.postId } });
  }

  @ResolveField('author')
  async author(@Parent() post: Post) {
    return this.prisma.post.findOne({ where: { id: post.id } }).author();
  }
}
