import { User } from "./User";

export interface Message {
    id: string;
	conversationId: string; 
    userId: string; 
    user: User;
	content: string; 
	pictures: string[] | null; 
    created_at: string;
    updated_at: string;
}