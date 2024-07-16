import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt();
    const password = await this.hashPassword(createUserDto.password, salt);

    await this.user.insert({
      username: createUserDto.username,
      email: createUserDto.email,
      password,
    });
  }

  async hashPassword(password: string, salt: string): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  findAll() {
    return this.user.find();
  }

  async findOne(id: number) {
    const user = await this.user.findOneBy({ id });

    if (!user) {
      throw new NotFoundException({
        success: false,
        message: `${id}를 가진 유저를 찾지 못했습니다`,
      });
    }

    return user;
  }

  async checkUserEmailAndUsername(
    email: string,
    username: string,
  ): Promise<void> {
    const existing = await this.user.findOne({
      where: [{ email }, { username }],
    });

    if (existing) {
      if (existing.email === email) {
        throw new ConflictException({
          success: false,
          message: `${email}은 이미 사용중인 이메일 입니다`,
        });
      }

      if (existing.username === username) {
        throw new ConflictException({
          success: false,
          message: `${username}은 이미 사용중인 이름 입니다`,
        });
      }
    }
  }

  async updatePassword(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<void> {
    const salt = await bcrypt.genSalt();
    const updatePassword = await this.hashPassword(
      updateUserDto.password,
      salt,
    );

    await this.user.update({ id }, { password: updatePassword });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    await this.checkUserEmailAndUsername(
      updateUserDto.email,
      updateUserDto.username,
    );
    await this.user.update({ id }, updateUserDto);
  }

  async remove(id: number) {
    await this.user.delete({ id });
  }
}
