import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { NestConsumer } from './processors';
@Module({
  imports: [AppModule],
  providers: [NestConsumer],
})
export class WorkerModule implements OnModuleInit {
  onModuleInit() {
    console.log('WORKER: ', process.pid);
  }
}
async function bootstrap() {
  const app = await NestFactory.create(WorkerModule);
  app.init();
}
bootstrap();
