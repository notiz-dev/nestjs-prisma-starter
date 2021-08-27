import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from '../../services/user.service';
import { PasswordService } from '../../services/password.service';

@Module({
  imports: [],
  providers: [UserResolver, UserService, PasswordService],
})
export class UserModule {}
