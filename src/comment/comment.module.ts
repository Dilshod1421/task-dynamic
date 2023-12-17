import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { PostModule } from 'src/post/post.module';

@Module({
  imports: [SequelizeModule.forFeature([Comment]), PostModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
