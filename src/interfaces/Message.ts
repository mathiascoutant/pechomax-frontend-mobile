import { User } from "./User";

export interface Message {
    id: string;
	conversationId: string; 
    userId: string; 
    user: User;
	content: string; 
	pictures: string[] | null; 
    createdAt: Date;
    updatedAt: Date;
}