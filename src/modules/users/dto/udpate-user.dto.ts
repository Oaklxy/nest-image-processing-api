import { PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

import { CreateUserDto } from './';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  public refresh_token: string;
};
