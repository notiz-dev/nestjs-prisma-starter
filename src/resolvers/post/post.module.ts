import { PrismaModule } from './../../prisma/prisma.module';
import { PostResolver } from './post.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [PostResolver],
})
export class PostModule {}
