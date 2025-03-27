import { PrismaService } from 'nestjs-prisma';
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { LikeIdArgs } from './dto/likeId.args';
import { PostIdArgs } from './args/post-id.args';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async createLike(userId: string, id: LikeIdArgs) {
    try {
      const newLike = await this.prisma.like.create({
        data: {
          userId,
          postId: id.postId,
        },
      });

      return newLike;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      ) {
        throw new ConflictException(
          `User ${userId} already liked post ${id.postId}`,
        );
      }
      throw new Error(e);
    }
  }

  async deleteLike(userId: string, id: LikeIdArgs) {
    const existingLike = await this.prisma.like.findUnique({
      where: {
        userId_postId: {
          userId: userId,
          postId: id.postId,
        },
      },
    });

    if (!existingLike) {
      throw new NotFoundException(
        `Like not found for user ${userId} and post ${id.postId}`,
      );
    }

    await this.prisma.like.delete({
      where: {
        userId_postId: {
          userId: userId,
          postId: id.postId,
        },
      },
    });

    return 'Like removed successfully';
  }

  async countLike(id: PostIdArgs) {
    const likeCount = await this.prisma.like.count({
      where: { postId: id.postId },
    });

    return { postId: id.postId, likeCount };
  }
}
