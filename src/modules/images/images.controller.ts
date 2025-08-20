import { Controller, Get, Param, ParseUUIDPipe, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ImagesService } from './images.service';
import { UploadImagesDto } from './dto';
import { PaginationDto } from '../../common';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  public constructor(
    private readonly imagesService: ImagesService,
  ) { };

  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.imagesService.findAll(paginationDto);
  };

  @Get(':id')
  public findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.imagesService.findOne(id);
  };

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  public upload(
    @UploadedFile() image: Express.Multer.File,
    uploadImagesDto: UploadImagesDto
  ) {
    return this.imagesService.upload(uploadImagesDto, image);
  };
};
