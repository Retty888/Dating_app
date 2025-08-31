export type Profile = {
  id: string;
  name: string;
  bio?: string;
  photos: string[];
  coordinates?: { lat: number; lng: number };
  age?: number;
  goals?: string[]; // coffee | walk | home | party | etc
  radiusKm?: number;
  timeWindows?: { day: string; from: string; to: string }[];
};
