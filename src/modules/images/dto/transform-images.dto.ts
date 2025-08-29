import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

class ResizeDto {
  @ApiProperty({
    description: 'The desired height of the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public height?: number;

  @ApiProperty({
    description: 'The desired width of the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public width?: number;
};

class CropDto {
  @ApiProperty({
    description: 'The new desired height for the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public height?: number;

  @ApiProperty({
    description: 'The new desired width for the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public width?: number;

  @ApiProperty({
    description: 'The new desired top for the image',
    type: Number,
    required: false,
  })
  public top?: number;

  @ApiProperty({
    description: 'The new desired left for the image',
    type: Number,
    required: false,
  })
  public left?: number;
};

export class RotateDto {
  @ApiProperty({
    description: 'The angle to rotate the image',
    type: Number,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  public angle?: number;
};

class TransformationsDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => CropDto)
  public crop?: CropDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => ResizeDto)
  public resize?: ResizeDto;

  @IsOptional()
  @ValidateNested()
  @Type(() => RotateDto)
  public rotate?: RotateDto;

  @IsString()
  @IsOptional()
  public format?: string;
};

export class TransformImagesDto {
  @ValidateNested()
  @Type(() => TransformationsDto)
  public transformations?: TransformationsDto;
};