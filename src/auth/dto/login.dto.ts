import { LoginInput } from './../../generated/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto extends LoginInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
