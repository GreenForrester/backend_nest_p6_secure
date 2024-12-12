import { IsNotEmpty, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsBoolean()
  updateinmail?: boolean;
}
