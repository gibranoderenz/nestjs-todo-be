import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
} from '@nestjs/common';
import CreateTodoDto from './create-todo.dto';
import { TodosService } from './todolist.service';
import UpdateTodoDto from './update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Get()
    async getAllTodos() {
        return this.todosService.getAllTodos();
    }

    @Get(':userId')
    async getUserTodos(@Param('userId') userId: string) {
        return this.todosService.getUserTodos(userId);
    }

    @Post(':userId')
    async createTodo(
        @Param('userId') userId: string,
        @Body() todo: CreateTodoDto,
    ) {
        return this.todosService.createTodo(userId, todo);
    }

    @Put(':userId/:id')
    async updatePost(
        @Param('userId') userId: string,
        @Param('id') id: string,
        @Body() todo: UpdateTodoDto,
    ) {
        return this.todosService.updateTodo(userId, parseInt(id), todo);
    }

    @Delete(':userId/:id')
    async deleteTodo(@Param('userId') userId: string, @Param('id') id: string) {
        return this.todosService.deleteTodo(userId, parseInt(id));
    }
}
