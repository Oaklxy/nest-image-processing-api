import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, MinLength } from 'class-validator';

export class SignUpDto {
  @ApiProperty({
    description: 'User name',
    example: 'Jefferson',
    required: true,
  })
  @IsString()
  @MinLength(3)
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'oaklxy@oaklxy.com',
    required: true,
    uniqueItems: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'mypassword123',
    required: true,
  })
  @IsString()
  @IsStrongPassword()
  public password: string;
};
