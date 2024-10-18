import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from '../types/user.interface'
import { CustomLoggerService } from '../core/utils/logger.service'

@Injectable()
export class AuthService {
  private logger = this.loggerService.getLogger('Auth')
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
    private loggerService: CustomLoggerService
  ) {}

  async validateUser(userEmail: string, pass: string) {
    const user = await this.usersService.findUserById(userEmail)
    if (user && user.password === pass) {
      const { ...result } = user
      return result
    }
    return null
  }

  async login(user: AuthDto) {
    try {
      const checkUser = await this.validateUser(user.email, user.password)
      console.log(checkUser)
      if (checkUser) {
        const payload = checkUser
        return {
          access_token: this.jwtService.sign(payload),
        }
      } else {
        throw new BadRequestException('User not found')
      }
    } catch (error) {
      this.logger.error('login', 'Failed to login', error)
      if (error instanceof NotFoundException) {
        throw error
      }
      throw new InternalServerErrorException('An error occurred during login')
    }
  }
}
