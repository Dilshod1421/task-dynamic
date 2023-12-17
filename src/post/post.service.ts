import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UserService } from 'src/user/user.service';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly userService: UserService,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<object> {
    try {
      await this.userService.findOne(createPostDto.user_id);
      const post = await this.postRepository.create(createPostDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Post created successfully',
        data: {
          post,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<object> {
    try {
      const posts = await this.postRepository.findAll({
        include: { all: true },
      });
      return {
        status: HttpStatus.OK,
        data: {
          posts,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const post = await this.postRepository.findByPk(id, {
        include: { all: true },
      });
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      return {
        status: HttpStatus.OK,
        data: {
          post,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: number, updatePostDto: UpdatePostDto): Promise<object> {
    try {
      const post = await this.postRepository.findByPk(id);
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      let obj = {};
      if (!updatePostDto.post_body) {
        obj = Object.assign(obj, { post_body: post.post_body });
      }
      if (!updatePostDto.user_id) {
        obj = Object.assign(obj, { user_id: post.user_id });
      }
      if (updatePostDto.user_id) {
        await this.userService.findOne(updatePostDto.user_id);
      }
      const dto = Object.assign(updatePostDto, obj);
      const updated_post = await this.postRepository.update(dto, {
        where: { post_id: id },
        returning: true,
      });
      return {
        status: HttpStatus.OK,
        message: 'Post updated successfully',
        data: {
          post: updated_post[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const post = await this.postRepository.findByPk(id);
      if (!post) {
        throw new NotFoundException('Post not found!');
      }
      post.destroy();
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Post deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
