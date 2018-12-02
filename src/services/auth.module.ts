import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}