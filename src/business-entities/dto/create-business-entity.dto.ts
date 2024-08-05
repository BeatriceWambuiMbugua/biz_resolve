import { IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateBusinessEntityDto {
  @IsNotEmpty()
  @IsString()
  businessName;

  @IsNotEmpty()
  @IsString()
  businessDescription;

  @IsNotEmpty()
  @IsArray()
  businessOwners: string[];

  @IsNotEmpty()
  @IsString()
  category;

  @IsNotEmpty()
  @IsString()
  phoneNumber;

  @IsNotEmpty()
  @IsEmail()
  email;

  // @IsNotEmpty()
  // @IsString()
  // logo;

  @IsNotEmpty()
  @IsString()
  address;

  @IsNotEmpty()
  @IsString()
  businessStartDate;
}
