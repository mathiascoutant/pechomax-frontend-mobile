import { Catch } from "../interfaces/Catch";

export const catches: Catch[] = [
  {
    id: "1",
    userId: "user123",
    length: 30,
    weight: 5.2,
    speciesId: 1,
    localisation: "Ocean",
    pictures: "https://picsum.photos/200/300",
    description: "Caught a big one!",
    date: "2024-04-28"
  },
  {
    id: "2",
    userId: "user456",
    length: 15,
    weight: 1.8,
    speciesId: 2,
    localisation: "River",
    pictures: "https://picsum.photos/200/300",
    description: "First catch of the day!",
    date: "2024-04-27"
  },
  {
    id: "3",
    userId: "user789",
    length: 40,
    weight: 7.5,
    speciesId: 3,
    localisation: null,
    pictures: null,
    description: "Pas de photo !",
    date: "2024-04-26"
  }
];
