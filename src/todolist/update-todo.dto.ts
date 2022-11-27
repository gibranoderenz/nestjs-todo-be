export default class UpdateTodoDto {
    id: number;
    user: string;
    title: string;
    description: string;
    createdAt: Date;
    isFinished: boolean;
}
