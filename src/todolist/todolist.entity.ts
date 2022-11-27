import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export default class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @CreateDateColumn()
    createdAt: Date;

    @Column({ default: false })
    isFinished: boolean;
}
