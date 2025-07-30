import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    description: 'Pagination page',
    default: 1,
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public page: number = 1;

  @ApiProperty({
    description: 'Pagination limit',
    default: 10,
    example: 10,
    required: false,
  })
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  public limit: number = 10;
};
