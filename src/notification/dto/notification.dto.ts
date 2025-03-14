import { IsNotEmpty, IsString, Length } from 'class-validator';

export class NotificationDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 500)
  text: string;
}