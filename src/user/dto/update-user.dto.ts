import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Ahmad',
    description: 'The name of the user',
  })
  user_name?: string;

  @ApiProperty({
    example: '20 years old. From Uzbekistan',
    description: 'The information about the user',
  })
  user_info?: string;
}
