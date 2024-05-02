import { User } from "./User";

export interface Catch {
    id: string;
    userId: string;
    length: number;
    weight: number;
    speciesId: number;
    species: {
      id: string;
      name: string;
      pointValue: number;
    }
    localisation: string | null;
    pictures: string[]; 
    description: string | null;
    date: Date;
    user: User;
  }