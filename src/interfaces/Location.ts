import { SpeciesLocation } from "./SpeciesLocation";
import { User } from "./User";

export interface Location {
    id: string;
    longitude: string;
    latitude: string;
    userId: string;
    user: User;
    name: string;
    speciesLocations: SpeciesLocation[] | null;
    description: string;
    createdAt: string;
    updatedAt: string;
}