import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma.module'
import { UserController } from './user.controller'
import { UserService } from './user.service'
import { CustomLoggerModule } from '../core/utils/logger.service'

@Module({
  imports: [PrismaModule, CustomLoggerModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
