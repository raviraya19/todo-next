import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CustomLoggerService } from '../core/utils/logger.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class UserService {
  private logger = this.loggerService.getLogger('Users')
  constructor(
    private prisma: PrismaService,
    private loggerService: CustomLoggerService
  ) {}

  async getAllUsers() {
    return this.prisma.user.findMany()
  }

  async addUser(user) {
    try {
      return await this.prisma.user.create({ data: user })
    } catch (error) {
      this.logger.error('addUser', 'Failed to insert user', error)
      throw new InternalServerErrorException()
    }
  }

  async updateUser(user) {
    try {
      return await this.prisma.user.update({ data: user, where: { id: user.id } })
    } catch (error) {
      this.logger.error('updateUser', 'Failed to update user', error)
      throw new InternalServerErrorException()
    }
  }

  async deleteUser(userId) {
    try {
      console.log(userId)

      return await this.prisma.user.delete({ where: { id: userId } })
    } catch (error) {
      this.logger.error('deleteUser', 'Failed to delete user', error)
      throw new InternalServerErrorException()
    }
  }

  async findUserById(userEmail: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email: userEmail } })
    } catch (error) {
      this.logger.error('findUser', 'Failed to find user', error)
    }
  }
}
