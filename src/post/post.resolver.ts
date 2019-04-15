import {
  Resolver,
  Query,
  ResolveProperty,
  Parent,
  Args,
} from '@nestjs/graphql';
import { PrismaService } from './../prisma/prisma.service';
import { Post, User } from './../generated/prisma-client';

@Resolver('Post')
export class PostResolver {
  constructor(private prisma: PrismaService) {}

  @Query('publishedPosts')
  publishedPosts(): Promise<Post[]> {
    return this.prisma.client.posts({ where: { published: true } });
  }

  @Query('userPosts')
  userPosts(@Args('userId') userId: string): Promise<Post[]> {
    return this.prisma.client
      .user({ id: userId })
      .posts({ where: { published: true } });
  }

  @Query('post')
  post(@Args('postId') postId: string): Promise<Post> {
    return this.prisma.client.post({ id: postId });
  }

  @ResolveProperty('author')
  getAuthor(@Parent() post: Post): Promise<User> {
    return this.prisma.client.post({ id: post.id }).author();
  }
}
