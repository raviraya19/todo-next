import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from '@nestjs/common'
import { TaskDto } from '../types/user.interface'
import { JoiValidationPipe } from '../core/pipes/validation/validation.pipe'
import { taskValidationSchema } from './task.validation'
import { ApiTags } from '@nestjs/swagger'
import { TaskService } from './task.service'

@ApiTags('tasks')
@Controller()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get('/tasks')
  getAllTasks() {
    return this.taskService.getTasks()
  }

  @Post('/tasks')
  @UsePipes(new JoiValidationPipe(taskValidationSchema))
  addTask(@Body() user: TaskDto) {
    return this.taskService.addTask(user)
  }

  @Put('/tasks/:id')
  @UsePipes(new JoiValidationPipe(taskValidationSchema))
  updateTask(@Body() user: TaskDto) {
    return this.taskService.updateTask(user)
  }

  @Delete('/tasks/:id')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTask(Number(id))
  }
}
