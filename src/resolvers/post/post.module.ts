import { PostResolver } from './post.resolver';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [PostResolver],
})
export class PostModule {}
