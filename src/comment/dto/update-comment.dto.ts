import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    example: 'I liked the new version',
    description: 'The body of the comment',
  })
  comment_body?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the post',
  })
  post_id?: number;
}
