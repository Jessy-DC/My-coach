import { Exercise } from './Exercise';

export interface Training {
  id: number;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  category: string;
  exercises: Exercise[];
  isCompleted: boolean;
  scheduledDate?: Date;
  targetMuscleGroups: string[];
}