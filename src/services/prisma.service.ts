import { Prisma } from './../generated/prisma-client/index';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaService {
    prisma: Prisma;

    constructor() {
        this.prisma = new Prisma({
            endpoint: 'http://localhost:4466',
            // TODO add prisma secret here
        });
    }

}