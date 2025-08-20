import { Injectable, NotFoundException } from '@nestjs/common';
import { Image as ImageModel } from '@prisma/client';
import * as sharp from 'sharp';

import { UploadImagesDto } from './dto/upload-images.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { IApiResponse, PaginationDto } from '../../common';
import { TransformImagesDto } from './dto';

@Injectable()
export class ImagesService {
  public constructor(
    private readonly prismaService: PrismaService,
  ) { };

  public async findAll(paginationDto: PaginationDto): Promise<IApiResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const images = await this.prismaService.image.findMany({
      skip: ((page - 1) * limit),
      take: limit,
    });

    return {
      ok: true,
      message: 'Images found successfully',
      data: {
        current_page: page,
        results: images.length,
        images,
      },
    };
  };

  public async findOne(id: string): Promise<IApiResponse> {
    const image: ImageModel | null = await this.prismaService.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new NotFoundException(`Image with id ${id} not found`);
    };

    return {
      ok: true,
      message: 'Image found successfully',
      data: {
        image,
      },
    };
  };

  public async upload(uploadImagesDto: UploadImagesDto, image: Express.Multer.File) {
    const { originalname, encoding, mimetype, buffer, size } = image;
    
    const metadata = await sharp(buffer).metadata();

    //TODO: Implement a service to handle image uploads

    const newImage: ImageModel = await this.prismaService.image.create({
      data: {
        width: metadata.width || 0,
        height: metadata.height || 0,
        format: metadata.format,
        url: originalname,
        user_id: 'test',
      },
    });

    return {
      ok: true,
      message: 'Image uploaded successfully',
      data: {
        image: metadata,
      },
    };
  };

  public transform(transformImagesDto: TransformImagesDto) {

  };
};
