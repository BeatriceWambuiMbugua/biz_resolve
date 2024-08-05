import { PartialType } from '@nestjs/mapped-types';
import {
  CreateBusinessFileUploadDto,
  CreateUserFileUploadDto,
} from './create-file-upload.dto';

export class UpdateFileUploadDto extends PartialType(
  CreateBusinessFileUploadDto,
) {}
export class UpdateUserFileUploadDto extends PartialType(
  CreateUserFileUploadDto,
) {}
