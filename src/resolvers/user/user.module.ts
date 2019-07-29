import { PhotonService } from './../../services/photon.service';
import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserResolver, PhotonService]
})
export class UserModule {}
