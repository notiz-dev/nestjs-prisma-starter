import { PostResolver } from './post.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [PostResolver],
})
export class PostModule {}
