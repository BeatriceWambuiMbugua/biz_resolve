import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { BusinessEntitiesModule } from './business-entities/business-entities.module';
import { RatingsModule } from './ratings/ratings.module';
import { FileUploadsModule } from './file-uploads/file-uploads.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/guard';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    BusinessEntitiesModule,
    RatingsModule,
    FileUploadsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // AuthService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
