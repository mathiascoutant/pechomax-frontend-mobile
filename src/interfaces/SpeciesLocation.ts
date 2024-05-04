import { Location } from "./Location";
import { Species } from "./Species";

export interface SpeciesLocation {
    id: string;
    speciesId: string;
    species: Species;
    locationId: string;
    location: Location;
}