import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Oakley',
    required: true,
    nullable: false,
  })
  @IsString()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'oakley@oakley.com',
    required: true,
    nullable: false,
    uniqueItems: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'EncryptedHash',
    required: true,
    nullable: false,
  })
  @IsStrongPassword()
  public password: string;
};
