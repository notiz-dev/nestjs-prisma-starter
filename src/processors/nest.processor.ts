import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
@Processor('nest-worker')
export class NestConsumer {
  logger = new Logger('NestConsumer');
  @Process('say-hello')
  async sayHello(job) {
    const { name } = job.data;
    this.logger.log(`Hello ${name}!`);
    return job.data;
  }
}
