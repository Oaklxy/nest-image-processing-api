import { Injectable, NotFoundException } from '@nestjs/common';
import { Image as ImageModel } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
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
      omit: {
        buffer: true,
      },
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

  public async upload(user, uploadImagesDto: UploadImagesDto, image: Express.Multer.File) {
    const { originalname, encoding, mimetype, buffer, size } = image;

    const metadata = await sharp(buffer).metadata();

    //TODO: Implement a service to handle image uploads

    const url: string = `${originalname.replace(/\.[^/.]+$/, "").toLowerCase()}-${uuidv4()}`;

    const newImage: ImageModel = await this.prismaService.image.create({
      data: {
        buffer,
        height: metadata.height || 0,
        width: metadata.width || 0,
        format: metadata.format,
        size,
        url,
        user_id: user.id,
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

    const image: ImageModel = (await this.findOne(id))?.data?.image;

    let transformedImage = sharp(image.buffer);

    if (transformations?.resize) {
      const { height, width } = transformations.resize;

      transformedImage.resize({
        height,
        width,
      });
    };

    if (transformations?.crop) {
      const { height, width, top, left } = transformations.crop;

      transformedImage.extract({
        height: height || image.height,
        width: width || image.width,
        top: top || 0,
        left: left || 0,
      });
    };

    if (transformations?.rotate) {
      const { angle } = transformations.rotate;

      transformedImage.rotate(angle || 0);
    };

    if (transformations?.format) {
      const { extension } = transformations.format;

      transformedImage.toFormat(extension as keyof sharp.FormatEnum).withMetadata();
    };

    const { data: outputBuffer, info } = await transformedImage.toBuffer({ resolveWithObject: true });

    const savedEditedImage = await this.prismaService.image.update({
      where: {
        id,
      },
      data: {
        buffer: outputBuffer,
        height: info.height,
        width: info.width,
        format: info.format,
        size: info.size,
      },
      omit: {
        buffer: true,
      },
    });

    return {
      ok: true,
      message: 'Image transformed successfully',
      data: {
        image: savedEditedImage,
      },
    };
  };
};
