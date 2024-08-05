import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateRatingDto {
  @IsNotEmpty()
  @IsString()
  userID;

  @IsNotEmpty()
  @IsString()
  businessEntityID;

  @IsNotEmpty()
  @IsInt()
  ratingValue;

  @IsNotEmpty()
  @IsString()
  comments;
}
