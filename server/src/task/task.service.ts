import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { CustomLoggerService } from '../core/utils/logger.service'
import { PrismaService } from '../prisma.service'

@Injectable()
export class TaskService {
  private logger = this.loggerService.getLogger('Tasks')
  constructor(
    private prisma: PrismaService,
    private loggerService: CustomLoggerService
  ) {}

  async getTasks() {
    return this.prisma.task.findMany()
  }

  async addTask(task) {
    try {
      return await this.prisma.task.create({ data: task })
    } catch (error) {
      this.logger.error('addTask', 'Failed to insert task', error)
      throw new InternalServerErrorException()
    }
  }

  async updateTask(task) {
    try {
      return await this.prisma.task.update({ data: task, where: { id: task.id } })
    } catch (error) {
      this.logger.error('updateTask', 'Failed to update task', error)
      throw new InternalServerErrorException()
    }
  }

  async deleteTask(taskId) {
    try {
      return await this.prisma.task.delete({ where: { id: taskId } })
    } catch (error) {
      this.logger.error('deleteTask', 'Failed to delete task', error)
      throw new InternalServerErrorException()
    }
  }
}
