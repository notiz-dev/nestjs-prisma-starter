import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
