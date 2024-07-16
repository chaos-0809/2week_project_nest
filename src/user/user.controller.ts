import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    const { username, email } = createUserDto;

    await this.userService.checkUserEmailAndUsername(email, username);
    await this.userService.create(createUserDto);

    return {
      success: true,
    };
  }

  @Get('@me')
  public async findMe(@Res({ passthrough: true }) res: Response) {
    const userId = res.locals.id;

    return await this.findOne(userId);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  public async updateName(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.userService.findOne(id);
    await this.userService.update(id, updateUserDto);

    return {
      success: true,
    };
  }

  @Patch(':id/pw')
  public async updatePassword(
    @Param('id') id: number,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): Promise<{ success: boolean }> {
    await this.userService.findOne(id);
    await this.userService.updatePassword(id, updateUserDto);

    return {
      success: true,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.findOne(id);
    await this.userService.remove(id);

    return {
      success: true,
    };
  }
}
