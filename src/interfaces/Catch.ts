import { User } from "./User";
import { Location } from "./Location";

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
    locationId: string;
    location: Location;
    pictures: string[]; 
    pointValue: number;
    description: string | null;
    date: Date;
    user: User;
    createdAt: Date;
  }