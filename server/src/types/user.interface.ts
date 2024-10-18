import { ApiProperty } from '@nestjs/swagger'

export class UserDto {
  @ApiProperty()
  id?: number

  @ApiProperty()
  email: string

  @ApiProperty()
  name: string

  @ApiProperty()
  password: string

  @ApiProperty()
  role: string
}
export class TaskDto {
  @ApiProperty()
  id?: number

  @ApiProperty()
  title: string

  @ApiProperty()
  description: string

  @ApiProperty()
  completed: boolean
}

export class AuthDto {
  @ApiProperty()
  email: string

  @ApiProperty()
  password: string
}
