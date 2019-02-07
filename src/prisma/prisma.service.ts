import { Injectable } from '@nestjs/common';
import { Prisma } from './client';
import { ConfigService } from '../services/config/config.service';

@Injectable()
export class PrismaService {
  client: Prisma;

  constructor(configService: ConfigService) {
    this.client = new Prisma({
      endpoint: process.env.PRISMA_ENDPOINT || configService.getString('PRISMA_ENDPOINT'),
      secret: configService.getString('PRISMA_SECRET'),
      debug: !configService.getBoolean('PRODUCTION'),
    });
  }
}
