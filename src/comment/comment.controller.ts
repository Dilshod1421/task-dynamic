import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Create a new comment' })
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Get all comments' })
  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Get comment by ID' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentService.findOne(id);
  }

  @ApiOperation({ summary: 'Update comment by ID' })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCommentDto: UpdateCommentDto) {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Delete comment by ID' })
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentService.remove(id);
  }
}
