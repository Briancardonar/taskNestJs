import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './tasks/schema/tasks.schema';
import { TasksController } from './tasks/tasks.controller';
import { CreateService } from './tasks/services/create.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:root@localhost:27017', {
      dbName: 'prueba',
    }),
    MongooseModule.forFeature([{ name: Task.name, schema: TaskSchema }]),
  ],
  controllers: [AppController, TasksController],
  providers: [AppService, CreateService],
})
export class AppModule {}
