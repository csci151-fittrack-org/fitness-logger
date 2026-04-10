export type WorkoutType = 'Cardio' | 'Strength' | 'Yoga' | 'Pilates' | 'HIIT' | 'Other';

export interface Workout {
  id: string;
  type: WorkoutType;
  duration: number; // in minutes
  calories: number;
  date: string; // ISO string
  notes?: string;
}

export interface DailyGoal {
  calories: number;
  duration: number;
  workouts: number;
}

export interface WeeklyStats {
  totalWorkouts: number;
  totalDuration: number;
  totalCalories: number;
  byType: Record<WorkoutType, number>;
}
