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

    @Post()
    async createTodo(@Body() todo: CreateTodoDto) {
        return this.todosService.createTodo(todo);
    }

    @Put(':userId/:id')
    async updatePost(
        @Param('userId') userId: string,
        @Param('id') id: string,
        @Body() todo: UpdateTodoDto,
    ) {
        return this.todosService.updateTodo(userId, parseInt(id), todo);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodo(Number(id));
    }
}
