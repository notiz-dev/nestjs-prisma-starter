import { SetMetadata } from '@nestjs/common';

export const AllowAny = () => SetMetadata('allow-any', true);
