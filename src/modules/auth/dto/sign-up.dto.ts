import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class SignUpDto {
  @IsString()
  public name: string;

  @IsEmail()
  public email: string;

  @IsString()
  @IsStrongPassword()
  public password: string;
};
