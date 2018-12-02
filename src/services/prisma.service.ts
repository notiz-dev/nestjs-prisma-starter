import { Prisma } from './../generated/prisma-client/index';
import { Injectable } from '@nestjs/common';

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