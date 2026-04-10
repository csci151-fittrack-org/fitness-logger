import React, { useEffect, useMemo, useState } from 'react';
import { endOfWeek, isSameDay, isWithinInterval, parseISO, startOfWeek } from 'date-fns';
import { WorkoutForm } from './WorkoutForm';
import { AppHeader } from './features/log-workout/AppHeader';
import { DailyGoalsSection } from './features/daily-goals/DailyGoalsSection';
import { EditGoalsButton } from './features/daily-goals/EditGoalsButton';
import { WeeklySummarySection } from './features/weekly-summary/WeeklySummarySection';
import { WorkoutListSection } from './features/workout-filter/WorkoutListSection';
import { DailyGoal, Workout, WorkoutType } from '@/src/types';

type WorkoutFilter = WorkoutType | 'All';

interface TodayStats {
  workouts: number;
  duration: number;
  calories: number;
}

export default function FitnessApp() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [goals, setGoals] = useState<DailyGoal>({ calories: 500, duration: 45, workouts: 1 });
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [filter, setFilter] = useState<WorkoutFilter>('All');

  useEffect(() => {
    const savedWorkouts = localStorage.getItem('fitness_workouts');
    const savedGoals = localStorage.getItem('fitness_goals');

    if (savedWorkouts) {
      setWorkouts(JSON.parse(savedWorkouts));
    }

    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('fitness_workouts', JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    localStorage.setItem('fitness_goals', JSON.stringify(goals));
  }, [goals]);

  const stats = useMemo(() => {
    const now = new Date();
    const start = startOfWeek(now);
    const end = endOfWeek(now);

    const weekly = workouts.filter((workout) =>
      isWithinInterval(parseISO(workout.date), { start, end }),
    );

    const byType: Record<WorkoutType, number> = {
      Cardio: 0,
      Strength: 0,
      Yoga: 0,
      Pilates: 0,
      HIIT: 0,
      Other: 0,
    };

    weekly.forEach((workout) => {
      byType[workout.type] += 1;
    });

    return {
      totalWorkouts: weekly.length,
      totalDuration: weekly.reduce((acc, workout) => acc + workout.duration, 0),
      totalCalories: weekly.reduce((acc, workout) => acc + workout.calories, 0),
      byType,
    };
  }, [workouts]);

  const todayStats = useMemo<TodayStats>(() => {
    const today = new Date();
    const daily = workouts.filter((workout) => isSameDay(parseISO(workout.date), today));

    return {
      workouts: daily.length,
      duration: daily.reduce((acc, workout) => acc + workout.duration, 0),
      calories: daily.reduce((acc, workout) => acc + workout.calories, 0),
    };
  }, [workouts]);

  const filteredWorkouts = useMemo(
    () => workouts.filter((workout) => filter === 'All' || workout.type === filter),
    [workouts, filter],
  );

  const openCreateWorkout = () => {
    setEditingWorkout(null);
    setIsFormOpen(true);
  };

  const closeWorkoutForm = () => {
    setIsFormOpen(false);
    setEditingWorkout(null);
  };

  const startEditingWorkout = (workout: Workout) => {
    setEditingWorkout(workout);
    setIsFormOpen(true);
  };

  const submitWorkout = (workout: Omit<Workout, 'id' | 'date'>) => {
    if (editingWorkout) {
      setWorkouts((prev) =>
        prev.map((existingWorkout) =>
          existingWorkout.id === editingWorkout.id ? { ...existingWorkout, ...workout } : existingWorkout,
        ),
      );
      closeWorkoutForm();
      return;
    }

    const newWorkout: Workout = {
      ...workout,
      id: Math.random().toString(36).slice(2, 11),
      date: new Date().toISOString(),
    };

    setWorkouts((prev) => [newWorkout, ...prev]);
    closeWorkoutForm();
  };

  const deleteWorkout = (id: string) => {
    if (!window.confirm('Are you sure you want to delete this workout?')) {
      return;
    }

    setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
  };

  const updateGoals = (nextGoals: DailyGoal) => {
    setGoals(nextGoals);
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] text-gray-900 font-sans pb-20">
      <AppHeader onOpenWorkoutForm={openCreateWorkout} />

      <main className="max-w-2xl mx-auto px-6 py-8 space-y-8">
        <DailyGoalsSection goals={goals} todayStats={todayStats} />
        <WeeklySummarySection stats={stats} />
        <WorkoutListSection
          workouts={filteredWorkouts}
          filter={filter}
          onFilterChange={setFilter}
          onEdit={startEditingWorkout}
          onDelete={deleteWorkout}
        />
      </main>

      <EditGoalsButton goals={goals} onUpdateGoals={updateGoals} />

      <WorkoutForm
        isOpen={isFormOpen}
        onClose={closeWorkoutForm}
        onSubmit={submitWorkout}
        editingWorkout={editingWorkout}
      />
    </div>
  );
}
