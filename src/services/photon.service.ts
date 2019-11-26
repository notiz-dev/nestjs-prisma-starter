import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Photon } from '@prisma/photon';

@Injectable()
export class PhotonService extends Photon
  implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super();
  }
  async onModuleInit() {
    await this.connect();
  }

  async onModuleDestroy() {
    await this.disconnect();
  }
}
