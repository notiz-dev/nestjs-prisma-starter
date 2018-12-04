import { AuthGuard } from './guards/auth.guards';
import { AuthModule } from './services/auth.module';
import { AppService } from './services/app.service';
import { AppController } from './controllers/app.controller';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from './services/prisma.module';
import { UsersModule } from './resolvers/users/users.module';

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
  providers: [AppService,
    AuthGuard],
})
export class AppModule { }
