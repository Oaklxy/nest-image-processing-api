import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { UsersService } from './user.service';
import { UpdateUserDto } from './dto';
import { PaginationDto } from '../../common';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  public constructor(
    private readonly usersService: UsersService,
  ) { };

  @Get()
  public findAll(
    @Query() paginationDto: PaginationDto,
  ) {
    return this.usersService.findAll(paginationDto);
  };

  @Get(':id')
  public findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.findOne(id);
  };

  @Patch(':id')
  public update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto)
  };

  @Delete(':id')
  public changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.usersService.changeStatus(id);
  };
};
