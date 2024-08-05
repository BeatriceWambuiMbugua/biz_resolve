import { ForbiddenException, Injectable } from '@nestjs/common';
import { CreateBusinessEntityDto } from './dto/create-business-entity.dto';
import { UpdateBusinessEntityDto } from './dto/update-business-entity.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessEntitiesService {
  constructor(private prismaService: PrismaService) {}
  async create(
    createBusinessEntityDto: CreateBusinessEntityDto,
    file: Express.Multer.File,
  ) {
    const {
      businessName,
      businessDescription,
      category,
      businessOwners,
      phoneNumber,
      email,
      businessStartDate,
      address,
    } = createBusinessEntityDto;
    try {
      if (!file) {
        throw new ForbiddenException('File is required');
      }
      const business = await this.prismaService.businessEntity.create({
        data: {
          businessName,
          businessDescription,
          businessStartDate,
          category,
          phoneNumber,
          email,
          logo: file && file.filename,
          address,
          businessOwners: {
            connect: businessOwners.map((userId) => ({ id: userId })),
          },
        },
      });
      return business;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'A business with that name already exists',
        );
      }
      console.log('Error', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const businesses = await this.prismaService.businessEntity.findMany({
        where: {
          blacklistedBusinesses: {
            none: {},
          },
        },
        include: {
          businessOwners: true,
          ratings: true,
          businessFiles: true,
        },
      });
      console.log('Businesses', businesses);
      return businesses;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const businesses = await this.prismaService.businessEntity.findUnique({
        where: {
          businessEntityID: id,
        },
      });
      return businesses;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  // async findMyusinesses(id: string) {
  //   try {
  //     const businesses = await this.prismaService.businessEntity.findUnique({
  //       where: {
  //         businessEntityID: id,
  //       },
  //     });
  //     return businesses;
  //   } catch (error) {
  //     console.log('Error', error);
  //     throw error;
  //   }
  // }

  async findBusinessesByOwner(ownerId: string) {
    console.log('Owner ID', ownerId);
    const businesses = await this.prismaService.businessEntity.findMany({
      where: {
        businessOwners: {
          some: { id: ownerId }, // Check if ownerId exists in the businessOwners array
        },
      },
      include: { ratings: true, businessFiles: true, businessOwners: true }, // Select only the businessEntityID
    });
    // console.log('businesses', businesses);
    return businesses;
  }
  async update(id: string, updateBusinessEntityDto: UpdateBusinessEntityDto) {
    const {
      businessName,
      businessDescription,
      category,
      businessOwners,
      email,
      // businessStartDate,
      // location,
      // address,
    } = updateBusinessEntityDto;
    try {
      const business = await this.prismaService.businessEntity.update({
        where: { businessEntityID: id }, // Specify the ID of the business entity to update
        data: {
          businessName,
          businessDescription,
          category,
          email,
          // location,
          // address,
          // businessStartDate,
          // // Update the businessOwners property with the correct type
          businessOwners: {
            connect: businessOwners.map((userId) => ({ id: userId })),
          },
        },
      });
      return business;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const business = await this.prismaService.businessEntity.delete({
        where: { businessEntityID: id },
      });
      return `Business ${business.businessName} has been deleted successfully`;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async blacklist(id: string) {
    try {
      // insert record in the blacklist table
      const blacklistBusiness = this.prismaService.blacklistedBusinesses.create(
        {
          data: {
            businessEntity: {
              connect: { businessEntityID: id }, // Connect to the BusinessEntity by businessEntityID
            },
          },
        },
      );
      return blacklistBusiness;
      // if (blacklistBusiness) {
      //   // delete business from the businesses table
      //   const deleteBusiness = await this.remove(id);
      //   return deleteBusiness;
      // }
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async getBlacklistedBusinesses() {
    console.log('Here MF!');
    try {
      const blacklistedBusinesses =
        await this.prismaService.blacklistedBusinesses.findMany({
          include: {
            businessEntity: true,
          },
        });
      console.log('Response', blacklistedBusinesses);
      return blacklistedBusinesses;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
