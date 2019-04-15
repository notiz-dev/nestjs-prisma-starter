import { SignupInput } from './../../generated/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignupDto extends SignupInput {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  name: string;
}
