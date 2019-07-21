import { GraphQLModule } from '@nestjs/graphql';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { AppResolver } from './app.resolver';
import { DateScalar } from './common/scalars/date.scalar';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: './src/schema.graphql',
      debug: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    PrismaModule,
    // AuthModule,
    // UserModule,
    // PostModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
