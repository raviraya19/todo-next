import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { JWT_EXPIRATION_TIME, JWT_SECRET_KEY } from '../core/constants/constant'
import { JwtStrategy } from './jwt.strategy'
import { CustomLoggerModule } from '../core/utils/logger.service'
import { PrismaModule } from '../prisma.module'
import { UserModule } from '../user/user.module'
@Module({
  imports: [
    CustomLoggerModule,
    PassportModule,
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET_KEY,
      signOptions: { expiresIn: JWT_EXPIRATION_TIME },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
