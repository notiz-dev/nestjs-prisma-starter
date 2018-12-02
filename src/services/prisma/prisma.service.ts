import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/prisma-client';

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