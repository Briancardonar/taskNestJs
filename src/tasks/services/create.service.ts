import { Injectable } from '@nestjs/common';
import { Task } from '../schema/tasks.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CreateService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(task: Task): Promise<Task> {
    const createdTask = await this.taskModel.create(task);
    return createdTask;
  }
}
