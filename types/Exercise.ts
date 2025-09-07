import { Equipment } from './Equipment';

export interface Exercise {
  id: number;
  title: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  category: string;
  duration: number;
  difficulty: string;
  equipments: Equipment[];
  targetMuscleGroup: string;
}