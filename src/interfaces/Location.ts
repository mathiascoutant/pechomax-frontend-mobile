import { Species } from "./Species";
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
    speciesIds: string[] | null;
    description: string;
    createdAt: string;
    updatedAt: string;
}