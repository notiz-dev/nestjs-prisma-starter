import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from '@auth/auth.module';
import { PrismaModule } from '@prisma/prisma.module';
import { UsersModule } from '@resolvers/users/users.module';
import { AppService } from '@services/app.service';
import { AppController } from '@controllers/app.controller';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
