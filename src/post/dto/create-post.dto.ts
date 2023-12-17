import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({
    example: 'There are some changes in the new version of Nodejs',
    description: 'The body of the post',
  })
  @IsNotEmpty()
  @IsString()
  post_body: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;
}
