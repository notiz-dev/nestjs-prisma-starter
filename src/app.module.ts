import { ConfigModule } from './services/config/config.module';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './resolvers/users/users.module';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';

@Module({
  imports: [
    ConfigModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req }) => ({ req }),
      playground: true,
      introspection: true,
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
