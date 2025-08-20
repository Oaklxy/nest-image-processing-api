import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class UserEntity implements User {
  @ApiProperty({
    description: 'User id',
    example: '74511a6a-f66c-4a55-af7b-bda95e64acc1',
    uniqueItems: true,
  })
  public id: string;

  @ApiProperty({
    description: 'User name',
    example: 'Jefferson',
    nullable: false,
    required: true,
  })
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'oaklxy@oaklxy.com',
    nullable: false,
    required: true,
    uniqueItems: true,
  })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'Hash: $argon2id$v=19$m=65536,t=3,p=4$sRs66SYNvkaHf4fLouuJag$TVBoVDAqaFcjrHKcAT5fekYddCKngF/u1RqwkO7CuoE',
    nullable: false,
    required: true,
  })
  public password: string;

  @ApiProperty({
    description: 'User JWT refresh token',
    example: 'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0NTExYTZhLWY2NmMtNGE1NS1hZjdiLWJkYTk1ZTY0YWNjMSIsImVtYWlsIjoib2FrbHh5QG9ha2x4eS5jb20iLCJpYXQiOjE3NTM3NjU3ODIsImV4cCI6MTc1Mzg1MjE4Mn0.p1dbqdNbQOo-klOpIIuCE2HkRK7BunWpjUKC2NttBTE',
    nullable: true,
    required: false, 
    uniqueItems: true,
  })
  public refresh_token: string | null;

  @ApiProperty({
    description: 'User is active status',
    default: true,
    example: 'true',
    required: false,
  })
  public is_active: boolean;

  @ApiProperty({
    description: 'User created at date',
    example: '2025-07-29T03:42:05.383Z',
    required: false,
  })
  public created_at: Date;

  @ApiProperty({
    description: 'User updated at date',
    example: '2025-07-29T05:09:42.340Z',
    nullable: false,
    required: false,
  })
  public updated_at: Date;
};
