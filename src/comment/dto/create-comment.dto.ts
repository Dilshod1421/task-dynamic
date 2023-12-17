import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({
    example: 'I liked the new version',
    description: 'The body of the comment',
  })
  @IsNotEmpty()
  @IsString()
  comment_body: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the post',
  })
  @IsNotEmpty()
  @IsNumber()
  post_id: number;
}
