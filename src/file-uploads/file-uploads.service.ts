import { Injectable } from '@nestjs/common';
import {
  CreateBusinessFileUploadDto,
  CreateUserFileUploadDto,
} from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FileUploadsService {
  constructor(private prismaService: PrismaService) {}
  async addBusinessFile(createFileUploadDto: CreateBusinessFileUploadDto) {
    const { fileName, businessEntityID } = createFileUploadDto;
    console.log('Data', createFileUploadDto);
    try {
      const newBusinessFile = await this.prismaService.businessFiles.create({
        data: {
          fileName,
          businessEntity: {
            connect: { businessEntityID }, // Connect to the BusinessEntity by businessEntityID
          },
        },
      });
      return newBusinessFile;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async addUserFile(createFileUploadDto: CreateUserFileUploadDto) {
    const { fileName, userID } = createFileUploadDto;
    console.log('Data', createFileUploadDto);
    try {
      const newBusinessFile = await this.prismaService.userFiles.create({
        data: {
          fileName,
          user: {
            connect: { id: userID }, // Connect to the BusinessEntity by businessEntityID
          },
        },
      });
      return newBusinessFile;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findAllBusinessFiles() {
    try {
      const businesFiles = await this.prismaService.businessFiles.findMany({
        include: {
          businessEntity: true,
        },
      });
      return businesFiles;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async findAllUserFiles() {
    try {
      const userFiles = await this.prismaService.userFiles.findMany({});
      return userFiles;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async findOne(id: string) {
    return `This action returns a #${id} fileUpload`;
  }

  async update(id: string, updateFileUploadDto: UpdateFileUploadDto) {
    return `This action updates a #${id} fileUpload`;
  }

  async remove(id: string) {
    try {
      const file = await this.prismaService.userFiles.delete({
        where: { fileID: id },
      });
      return `File ${file.fileName} has been deleted successfully`;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
}
