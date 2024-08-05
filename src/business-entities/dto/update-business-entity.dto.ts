import { PartialType } from '@nestjs/mapped-types';
import { CreateBusinessEntityDto } from './create-business-entity.dto';

export class UpdateBusinessEntityDto extends PartialType(
  CreateBusinessEntityDto,
) {}
