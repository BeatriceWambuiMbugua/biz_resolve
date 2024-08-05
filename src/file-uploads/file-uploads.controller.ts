import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileUploadsService } from './file-uploads.service';
import {
  CreateBusinessFileUploadDto,
  CreateUserFileUploadDto,
} from './dto/create-file-upload.dto';
import { UpdateFileUploadDto } from './dto/update-file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multerConfig';

@Controller('api/v1/file-uploads')
export class FileUploadsController {
  constructor(private readonly fileUploadsService: FileUploadsService) {}

  @Post('business-file/single/:businessEntityID')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadBusinessFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('businessEntityID') businessEntityID: string,
  ) {
    console.log('File', file);
    const createBusinessFileUploadDto: CreateBusinessFileUploadDto = {
      fileName: file.filename,
      businessEntityID,
    };
    return this.fileUploadsService.addBusinessFile(createBusinessFileUploadDto);
  }
  @Post('user-file/single/:userID')
  @UseInterceptors(FileInterceptor('file', multerConfig))
  async uploadUserFile(
    @UploadedFile() file: Express.Multer.File,
    @Param('userID') userID: string,
  ) {
    const createUserFileUploadDto: CreateUserFileUploadDto = {
      fileName: file.filename,
      userID,
    };
    return this.fileUploadsService.addUserFile(createUserFileUploadDto);
  }

  @Get('business-files')
  findAllBusinessFiles() {
    return this.fileUploadsService.findAllBusinessFiles();
  }
  @Get('user-files')
  findAllUserFiles() {
    return this.fileUploadsService.findAllUserFiles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileUploadsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFileUploadDto: UpdateFileUploadDto,
  ) {
    return this.fileUploadsService.update(id, updateFileUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileUploadsService.remove(id);
  }
}
