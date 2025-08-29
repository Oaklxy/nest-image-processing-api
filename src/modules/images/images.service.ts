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
        buffer,
        height: metadata.height || 0,
        width: metadata.width || 0,
        format: metadata.format,
        size,
        url: originalname,
        user_id: '74511a6a-f66c-4a55-af7b-bda95e64acc1',
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

  public async transform(id: string, transformImagesDto: TransformImagesDto) {
    const transformations = transformImagesDto?.transformations;

    let savedEditedImage: ImageModel | undefined;
    const image: ImageModel = (await this.findOne(id))?.data?.image;

    if (transformations?.resize) {
      const { height, width } = transformations.resize;

      const editedImage = sharp(image.buffer)
        .resize({
          height,
          width,
        });

      const outputBuffer = await editedImage.toBuffer();

      savedEditedImage = await this.prismaService.image.update({
        where: {
          id,
        },
        data: {
          height,
          width,
          buffer: outputBuffer,
        },
      });
    };

    if (transformations?.crop) {
      const { height, width, top, left } = transformations.crop;

      const editedImage = sharp(image.buffer)
        .extract({
          height: height || image.height,
          width: width || image.width,
          top: top || 0,
          left: left || 0,
        });

      const outputBuffer = await editedImage.toBuffer();

      savedEditedImage = await this.prismaService.image.update({
        where: {
          id,
        },
        data: {
          height: height || image.height,
          width: width || image.width,
          buffer: outputBuffer,
        },
      });
    };

    if (transformations?.rotate) {
      const { angle } = transformations.rotate;

      const editedImage = sharp(image.buffer)
        .rotate(angle || 0);

      const outputBuffer = await editedImage.toBuffer();

      savedEditedImage = await this.prismaService.image.update({
        where: {
          id,
        },
        data: {
          buffer: outputBuffer,
        },
      });
    };

    return {
      ok: true,
      message: 'Image transformed successfully',
      data: {
        image: savedEditedImage,
      },
    };
  };
};
