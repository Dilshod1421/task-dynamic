import { ApiProperty } from '@nestjs/swagger';

export class UpdatePostDto {
  @ApiProperty({
    example: 'There are some changes in the new version of Nodejs',
    description: 'The body of the post',
  })
  post_body?: string;

  @ApiProperty({
    example: 1,
    description: 'The ID of the user',
  })
  user_id?: number;
}
