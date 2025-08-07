import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'User refresh token',
    example: 'Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0NTExYTZhLWY2NmMtNGE1NS1hZjdiLWJkYTk1ZTY0YWNjMSIsImVtYWlsIjoib2FrbHh5QG9ha2x4eS5jb20iLCJpYXQiOjE3NTM3NjU3ODIsImV4cCI6MTc1Mzg1MjE4Mn0.p1dbqdNbQOo-klOpIIuCE2HkRK7BunWpjUKC2NttBTE',
    required: false,
    uniqueItems: true,
  })
  @IsOptional()
  public refresh_token: string;
};
