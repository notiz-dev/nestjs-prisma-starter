import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class AppService {
  constructor(@InjectQueue('nest-worker') private nestWorkerQueue: Queue) {}
  getHello(): string {
    return 'Hello World!';
  }

  getHelloName(name: string): string {
    return `Hello ${name}!`;
  }

  async sayHello(name: string) {
    return await this.nestWorkerQueue.add('say-hello', { name });
  }
}
