import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { ImagesService } from './images.service';
import { TransformImagesDto, UploadImagesDto } from './dto';
import { PaginationDto } from '../../common';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  public constructor(
    private readonly imagesService: ImagesService,
  ) { };

  @UseGuards(JwtAuthGuard)
  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.imagesService.findAll(paginationDto);
  };

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.imagesService.findOne(id);
  };

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  public upload(
    @UploadedFile() image: Express.Multer.File,
    uploadImagesDto: UploadImagesDto
  ) {
    return this.imagesService.upload(uploadImagesDto, image);
  };

  @UseGuards(JwtAuthGuard)
  @Patch('transform/:id')
  public transform(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() transformImagesDto: TransformImagesDto,
  ) {
    return this.imagesService.transform(id, transformImagesDto);
  };
};
