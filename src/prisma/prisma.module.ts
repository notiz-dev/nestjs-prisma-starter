import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../services/config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }
