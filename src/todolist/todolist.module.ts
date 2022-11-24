import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Todo from './todolist.entity';
import { TodosService } from './todolist.service';
import { TodosController } from './todolist.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Todo])],
    controllers: [TodosController],
    providers: [TodosService],
})
export class TodosModule {}
