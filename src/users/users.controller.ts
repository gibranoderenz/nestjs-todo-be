import { Controller, Get, Delete, Body, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }

    @Post()
    async createUser(@Body() body) {
        return this.usersService.createUser(body['idToken']);
    }

    @Delete()
    async deleteUser(@Body() body) {
        return this.usersService.deleteUser(body['idToken']);
    }
}
