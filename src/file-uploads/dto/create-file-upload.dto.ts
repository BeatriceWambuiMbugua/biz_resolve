import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessFileUploadDto {
  @IsNotEmpty()
  @IsString()
  fileName;

  @IsNotEmpty()
  @IsString()
  businessEntityID;
}
export class CreateUserFileUploadDto {
  @IsNotEmpty()
  @IsString()
  fileName;

  @IsNotEmpty()
  @IsString()
  userID;
}
