import { User } from "./User";
import { Category } from "./Category";

export interface Conversation {
    id: string;
    userId: string;
    user: User;
    title: string;
    categoryId: string;
    category: Category;
    createdAt: Date;
    updatedAt: Date;
}