import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateRatingDto } from './dto/create-rating.dto';
import { UpdateRatingDto } from './dto/update-rating.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RatingsService {
  constructor(private prismaService: PrismaService) {}
  async create(createRatingDto: CreateRatingDto) {
    const { userID, businessEntityID, ratingValue, comments } = createRatingDto;
    try {
      const rating = await this.prismaService.rating.create({
        data: {
          ratingValue,
          comments,
          user: { connect: { id: userID } },
          businessEntity: { connect: { businessEntityID } },
        },
      });
      return rating;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const ratings = await this.prismaService.rating.findMany({
        include: {
          user: true,
          businessEntity: true,
        },
      });
      return ratings;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      console.log('ID', id);
      const rating = await this.prismaService.rating.findUnique({
        where: {
          ratingID: id,
        },
        include: {
          user: true,
          businessEntity: true,
        },
      });
      // console.log('Result', rating);
      return rating;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async findRatingByUser(id: string) {
    try {
      const rating = await this.prismaService.rating.findMany({
        where: {
          userID: id,
        },
        include: {
          user: true,
          businessEntity: true,
        },
      });
      return rating;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async findRatingByBusiness(id: string) {
    try {
      const rating = await this.prismaService.rating.findMany({
        where: {
          businessEntityID: id,
        },
        include: {
          user: true,
          businessEntity: true,
        },
      });
      return rating;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateRatingDto: UpdateRatingDto) {
    const { userID, businessEntityID, ratingValue, comments } = updateRatingDto;
    try {
      const rating = await this.prismaService.rating.update({
        where: { ratingID: id },
        data: {
          ratingValue,
          comments,
          user: { connect: { id: userID } },
          businessEntity: { connect: { businessEntityID } },
        },
      });
      return rating;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ForbiddenException('No such rating exists');
      }
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const rating = await this.prismaService.rating.delete({
        where: { ratingID: id },
      });
      return rating;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new ForbiddenException('No such rating exists');
      }
      console.log('Error occured here', error);
      throw error;
    }
  }
}
