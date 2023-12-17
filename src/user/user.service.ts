import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Post } from 'src/post/models/post.model';
import { Comment } from 'src/comment/models/comment.model';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto): Promise<object> {
    try {
      const user = await this.userRepository.create(createUserDto);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<object> {
    try {
      const users = await this.userRepository.findAll({
        include: { model: Post, include: [Comment] },
      });
      return {
        status: HttpStatus.OK,
        data: {
          users,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id, {
        include: { model: Post, include: [Comment] },
      });
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      return {
        status: HttpStatus.OK,
        data: {
          user,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      let obj = {};
      if (!updateUserDto.user_name) {
        obj = Object.assign(obj, { user_name: user.user_name });
      }
      if (!updateUserDto.user_info) {
        obj = Object.assign(obj, { user_info: user.user_info });
      }
      const dto = Object.assign(updateUserDto, obj);
      const updated_user = await this.userRepository.update(dto, {
        where: { user_id: id },
        returning: true,
      });
      return {
        status: HttpStatus.OK,
        message: 'User updated successfully',
        data: {
          user: updated_user[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const user = await this.userRepository.findByPk(id);
      if (!user) {
        throw new NotFoundException('User not found!');
      }
      user.destroy();
      return {
        status: HttpStatus.ACCEPTED,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
