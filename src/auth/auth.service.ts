import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(createAuthDto: CreateAuthDto) {
    const { password } = createAuthDto;
    try {
      // generate password hash
      const hash = await argon.hash(password);
      const newUser = await this.prismaService.user.create({
        data: {
          ...createAuthDto,
          password: hash,
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          role: true,
        },
      });
      // console.log('New user', newUser);
      // return the saved user
      // send auth token back to api
      const accessToken = await this.signToken(newUser.id, newUser.email);
      return { user: { ...newUser }, ...accessToken };
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('User with that email already exists');
      }
      throw error;
    }
  }

  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new ForbiddenException('User with email does not exist');
      }

      // compare the password
      const passwordMatches = await argon.verify(user.password, password);
      if (!passwordMatches) {
        throw new ForbiddenException('Password is incorrect');
      }

      // send auth token back to api
      const accessToken = await this.signToken(user.id, user.email);

      // delete user.id;
      // delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      return { user: { ...user }, ...accessToken };
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  async findAll() {
    try {
      const users = await this.prismaService.user.findMany({
        include: {
          businessOwnerOf: true,
          ratings: true,
        },
      });
      return users;
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async update(id: string, updateAuthDto: UpdateAuthDto) {
    try {
      const updateUser = await this.prismaService.user.update({
        where: { id: id },
        data: { ...updateAuthDto },
      });
      return updateUser;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const user = await this.prismaService.user.delete({
        where: { id: id },
      });
      return user;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ accessToken: string }> {
    const payload = {
      sub: userId,
      email,
    };
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: '1d',
      secret: this.configService.get('JWT_SECRET'),
    });
    return { accessToken };
  }
}
