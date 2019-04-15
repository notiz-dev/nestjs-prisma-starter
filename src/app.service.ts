import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getHelloName(name?: string): string {
    return name ? `Hello ${name}!` : 'Hello World!';
  }
}
