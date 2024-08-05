import { Module } from '@nestjs/common';
import { BusinessEntitiesService } from './business-entities.service';
import { BusinessEntitiesController } from './business-entities.controller';

@Module({
  controllers: [BusinessEntitiesController],
  providers: [BusinessEntitiesService],
})
export class BusinessEntitiesModule {}
