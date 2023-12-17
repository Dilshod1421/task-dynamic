import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'Ahmad',
    description: 'The name of the user',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  user_name: string;

  @ApiProperty({
    example: '20 years old. From Uzbekistan',
    description: 'The information about the user',
  })
  user_info?: string;
}
