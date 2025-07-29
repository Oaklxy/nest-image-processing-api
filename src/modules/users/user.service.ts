import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User as UserModel } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto';
import { IApiResponse, PaginationDto } from '../../common';

@Injectable()
export class UsersService {
  public constructor(
    private readonly prismaService: PrismaService,
  ) { };

  public async findAll(paginationDto: PaginationDto): Promise<IApiResponse> {
    const { page = 1, limit = 10 } = paginationDto;

    const users: UserModel[] | null = await this.prismaService.user.findMany({
      skip: ((page - 1) * limit),
      take: limit,
    });

    return {
      ok: true,
      message: 'Users found successfully',
      data: {
        current_page: page,
        results: users.length,
        users,
      },
    };
  };

  public async findOne(id: string): Promise<IApiResponse> {
    const user: UserModel | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    };

    return {
      ok: true,
      message: 'User found successfully',
      data: {
        user,
      },
    };
  };

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<IApiResponse | undefined> {
    try {
      const user: UserModel | null = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
      },
    });
    
    if (!user.is_active) {
      throw new BadRequestException(`This user is currently unavailable`);
    };

    return {
      ok: true,
      message: 'User updated successfully',
      data: {
        user,
      },
    };
    } catch (error) {
      if (
        error.code === 'P2025'
      ) {
        throw new NotFoundException(`User with id ${id} nof found`);
      };
    };
  };

  public async changeStatus(id: string): Promise<IApiResponse | undefined> {
    const user: UserModel | null = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    const updatedUser: UserModel | null = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        is_active: !user?.is_active,
      },
    });

    return {
      ok: true,
      message: 'User status changed successfully',
      data: {
        user: updatedUser,
      },
    };
  };
};
