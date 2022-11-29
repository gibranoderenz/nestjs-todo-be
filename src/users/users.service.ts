import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './users.entity';
import { initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { applicationDefault } from 'firebase-admin/app';

const app = initializeApp({
    credential: applicationDefault(),
    projectId: 'compfest-test',
});
const auth = getAuth(app);

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async createUser(idToken: string) {
        const decodedToken = await auth.verifyIdToken(idToken);
        const user = {
            email: decodedToken.email,
            uid: decodedToken.uid,
        };
        const prevUser = await this.userRepository.findOne({
            where: { email: user.email },
        });
        if (!prevUser) {
            const newUser = await this.userRepository.create(user);
            await this.userRepository.save(newUser);
        }
    }

    async deleteUser(idToken: string) {
        const decodedToken = await auth.verifyIdToken(idToken);
        const targetUser = await this.userRepository.findOne({
            where: { email: decodedToken.email },
        });
        if (targetUser) {
            await this.userRepository.delete(targetUser.id);
        } else {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    }
}
