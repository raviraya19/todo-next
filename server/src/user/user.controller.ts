import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDto } from '../types/user.interface'
import { JoiValidationPipe } from '../core/pipes/validation/validation.pipe'
import { userValidationSchema } from './user.validation'
import { ApiTags } from '@nestjs/swagger'
import { Roles } from '../core/decorators/role.decorator'
import { Role } from '../core/utils/roles'
import { Public } from '../core/decorators/public.decorator'

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/user')
  getAllUsers() {
    return this.userService.getAllUsers()
  }

  @Public()
  @Post('/user/add')
  @UsePipes(new JoiValidationPipe(userValidationSchema))
  addUser(@Body() user: UserDto) {
    return this.userService.addUser(user)
  }

  @Put('/user/update')
  @UsePipes(new JoiValidationPipe(userValidationSchema))
  updateUser(@Body() user: UserDto) {
    return this.userService.updateUser(user)
  }

  @Get('/search')
  searchUsers(@Query('name') name: string) {
    return `Searching for users with name: ${name}`
  }

  @Roles(Role.admin)
  @Delete('/user/delete/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(Number(id))
  }
}
