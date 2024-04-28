export interface Message {
    id: string;
	conversationId: string; 
    userId: string; 
	content: string; 
	pictures: string[] | null; 
    created_at: string;
    updated_at: string;
}