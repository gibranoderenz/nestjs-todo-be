import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateTodoDto from './create-todo.dto';
import Todo from './todolist.entity';
import UpdateTodoDto from './update-todo.dto';

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private todoRepository: Repository<Todo>,
    ) {}

    getAllTodos() {
        return this.todoRepository.find();
    }

    async getTodoById(id: number) {
        const todo = await this.todoRepository.findOne({ where: { id: id } });
        if (todo) return todo;

        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    async createTodo(todo: CreateTodoDto) {
        const newTodo = await this.todoRepository.create(todo);
        await this.todoRepository.save(newTodo);

        return newTodo;
    }

    async updateTodo(id: number, todo: UpdateTodoDto) {
        await this.todoRepository.update(id, todo);
        const updatedTodo = await this.todoRepository.findOne({
            where: { id: id },
        });
        if (updatedTodo) return updatedTodo;

        throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }

    async deleteTodo(id: number) {
        const deletedTodo = await this.todoRepository.delete(id);
        if (!deletedTodo.affected) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
    }
}
