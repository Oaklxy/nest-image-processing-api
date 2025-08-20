import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class TransformImagesDto {
  @ApiProperty({
    description: 'The desired width of the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public width?: number;

  @ApiProperty({
    description: 'The desired height of the image',
    type: Number,
    required: false,
  })
  public height?: number;
};