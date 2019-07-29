import { PhotonService } from './../../services/photon.service';
import { PostResolver } from './post.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [PostResolver, PhotonService]
})
export class PostModule {}
