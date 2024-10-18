import { AuthModule } from './auth/auth.module'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma.module'
import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { ENV_VALIDATION_SCHEMA } from './core/config/env.config'
import { TerminusModule } from '@nestjs/terminus'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './core/guards/jwt-auth.guard'
import { RolesGuard } from './core/guards/roles.guard'
import { TaskModule } from './task/task.module'

@Module({
  imports: [
    AuthModule,
    UserModule,
    TaskModule,
    PrismaModule,
    TerminusModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      validationSchema: ENV_VALIDATION_SCHEMA,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
