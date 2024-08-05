import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessEntitiesService } from './business-entities.service';
import { CreateBusinessEntityDto } from './dto/create-business-entity.dto';
import { UpdateBusinessEntityDto } from './dto/update-business-entity.dto';
import { AccessTokenGuard } from 'src/auth/guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/multerConfig';
import { Public } from 'src/auth/decorator';
@UseGuards(AccessTokenGuard)
@Controller('api/v1/business-entities')
export class BusinessEntitiesController {
  constructor(
    private readonly businessEntitiesService: BusinessEntitiesService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', multerConfig))
  create(
    @Body() createBusinessEntityDto: CreateBusinessEntityDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.businessEntitiesService.create(createBusinessEntityDto, file);
  }

  @Public()
  @Get()
  findAll() {
    return this.businessEntitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.businessEntitiesService.findOne(id);
  }
  @Get('businesses/:owner_id')
  findBusinessesByOwner(@Param('owner_id') owner_id: string) {
    return this.businessEntitiesService.findBusinessesByOwner(owner_id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateBusinessEntityDto: UpdateBusinessEntityDto,
  ) {
    return this.businessEntitiesService.update(id, updateBusinessEntityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.businessEntitiesService.remove(id);
  }

  @Get('blacklist/all')
  getBlacklist() {
    return this.businessEntitiesService.getBlacklistedBusinesses();
  }
  @Post('blacklist/:id')
  blacklistBusiness(@Param('id') id: string) {
    return this.businessEntitiesService.blacklist(id);
  }
}
