import { Module } from '@nestjs/common'
import { PrismaModule } from '../prisma.module'
import { CustomLoggerModule } from '../core/utils/logger.service'
import { TaskController } from './task.controller'
import { TaskService } from './task.service'

@Module({
  imports: [PrismaModule, CustomLoggerModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
