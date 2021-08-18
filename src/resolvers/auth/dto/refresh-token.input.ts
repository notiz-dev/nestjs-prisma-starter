import { ArgsType } from '@nestjs/graphql';
import { IsJWT, IsNotEmpty } from 'class-validator';

@ArgsType()
export class RefreshTokenInput {
  @IsNotEmpty()
  @IsJWT()
  token: string;
}
