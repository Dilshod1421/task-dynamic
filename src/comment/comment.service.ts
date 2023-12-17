import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { PostService } from 'src/post/post.service';
import { Post } from 'src/post/models/post.model';
import { User } from 'src/user/models/user.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment) private commentRepository: typeof Comment,
    private readonly postService: PostService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<object> {
    try {
      await this.postService.findOne(createCommentDto.post_id);
      const comment = await this.commentRepository.create(createCommentDto);
      return {
        status: HttpStatus.CREATED,
        message: 'Comment created successfully',
        data: {
          comment,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<object> {
    try {
      const comments = await this.commentRepository.findAll({
        include: { model: Post, include: [User] },
      });
      return {
        status: HttpStatus.OK,
        data: {
          comments,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<object> {
    try {
      const comment = await this.commentRepository.findByPk(id);
      if (!comment) {
        throw new NotFoundException('Comment not found!');
      }
      return {
        status: HttpStatus.OK,
        data: {
          comment,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<object> {
    try {
      const comment = await this.commentRepository.findByPk(id);
      if (!comment) {
        throw new NotFoundException('Comment not found!');
      }
      let obj = {};
      if (!updateCommentDto.comment_body) {
        obj = Object.assign(obj, { comment_body: comment.comment_body });
      }
      if (!updateCommentDto.post_id) {
        obj = Object.assign(obj, { post_id: comment.post_id });
      }
      if (updateCommentDto.post_id) {
        await this.postService.findOne(updateCommentDto.post_id);
      }
      const dto = Object.assign(updateCommentDto, obj);
      const updated_comment = await this.commentRepository.update(dto, {
        where: { comment_id: id },
        returning: true,
      });
      return {
        status: HttpStatus.OK,
        message: 'Comment updated successfully',
        data: {
          comment: updated_comment[1][0],
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<object> {
    try {
      const comment = await this.commentRepository.findByPk(id);
      if (!comment) {
        throw new NotFoundException('Comment not found!');
      }
      comment.destroy();
      return {
        status: HttpStatus.ACCEPTED,
        message: 'Comment deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
