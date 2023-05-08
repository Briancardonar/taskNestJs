import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { createTaskDto } from './dto/create-task.dto';
import { Task } from './schema/tasks.schema';
import { CreateService } from './services/create.service';

@Controller('tasks')
export class TasksController {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
    private readonly createService: CreateService,
  ) {}

  @Get()
  async getTasks(): Promise<Model<Task>[]> {
    return await this.taskModel.find({});
  }

  @Post()
  async createTask(@Body() task: createTaskDto) {
    this.createService.createTask(task);
  }

  @Put('/:id')
  async editTask(@Param('id') id: number, @Body() task: createTaskDto) {
    const entity = await this.taskModel.findByIdAndUpdate(id, task);
    return entity;
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: number, @Body() task: createTaskDto) {
    await this.taskModel.findByIdAndDelete(id, task);
  }
}
