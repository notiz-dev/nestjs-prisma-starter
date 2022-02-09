import { Module } from '@nestjs/common';
import { PostResolver } from './post.resolver';

@Module({
  imports: [],
  providers: [PostResolver],
})
export class PostModule {}
