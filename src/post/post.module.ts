import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './models/post.model';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Post]), UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
