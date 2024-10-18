import { Body, Controller, Post, UsePipes } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ApiTags } from '@nestjs/swagger'
import { JoiValidationPipe } from '../core/pipes/validation/validation.pipe'
import { authValidationSchema } from './auth.validation'
import { AuthDto } from '../types/user.interface'
import { Public } from '../core/decorators/public.decorator'

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('auth/login')
  @UsePipes(new JoiValidationPipe(authValidationSchema))
  async login(@Body() user: AuthDto) {
    return this.authService.login(user)
  }
}
