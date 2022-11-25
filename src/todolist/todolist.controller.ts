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
    getTodos() {
        return this.todosService.getAllTodos();
    }

    @Get(':id')
    getTodoById(@Param('id') id: string) {
        return this.todosService.getTodoById(parseInt(id));
    }

    @Post()
    async createTodo(@Body() todo: CreateTodoDto) {
        return this.todosService.createTodo(todo);
    }

    @Put(':id')
    async updatePost(@Param('id') id: string, @Body() todo: UpdateTodoDto) {
        return this.todosService.updateTodo(parseInt(id), todo);
    }

    @Delete(':id')
    async deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodo(Number(id));
    }
}
