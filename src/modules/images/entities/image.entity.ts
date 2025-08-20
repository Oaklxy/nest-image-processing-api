import { ApiProperty } from '@nestjs/swagger';

export class ImageEntity {
  @ApiProperty({
    description: 'Image id',
    example: '74511a6a-f66c-4a55-af7b-bda95e64acc1',
    uniqueItems: true,
  })
  public id: string;

  @ApiProperty({
    description: 'Image URL',
    example: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg',
    required: true,
  })
  public url: string;

  @ApiProperty({
    description: 'Image file format',
    example: 'jpg',
    required: true,
  })
  public format: string;

  @ApiProperty({
    description: 'Image width in pixels',
    example: 800,
    required: true,
  })
  public width: number;

  @ApiProperty({
    description: 'Image height in pixels',
    example: 600,
    required: true,
  })
  public height: number;
};
