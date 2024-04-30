import { Level } from "./Level";

export interface User {
    city: string;
    createdAt: string;
    email: string;
    id: string;
    levelId: string;
    level: Level;
    password: string;
    phoneNumber: string | null;
    profilePic: string;
    region: string | null;
    role: string;
    score: number;
    updatedAt: string;
    username: string;
    zipCode: string | null;
  };