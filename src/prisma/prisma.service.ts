import { Injectable } from '@nestjs/common';
import { Prisma } from './client';

@Injectable()
export class PrismaService {
  client: Prisma;

  constructor() {
    this.client = new Prisma({
      endpoint: 'http://localhost:4466',
      // TODO add prisma secret here
    });
  }
}
