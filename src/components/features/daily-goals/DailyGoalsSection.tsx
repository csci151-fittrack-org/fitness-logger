import { Target } from 'lucide-react';
import { DailyGoal } from '@/src/types';
import { Card } from '@/src/components/ui/Card';
import { ProgressBar } from '@/src/components/ui/ProgressBar';

interface TodayStats {
  workouts: number;
  duration: number;
  calories: number;
}

interface DailyGoalsSectionProps {
  goals: DailyGoal;
  todayStats: TodayStats;
}

export function DailyGoalsSection({ goals, todayStats }: DailyGoalsSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-end">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Target size={20} className="text-[#007AFF]" />
          Daily Goals
        </h2>
      </div>
      <Card className="grid grid-cols-1 gap-6">
        <ProgressBar
          progress={(todayStats.calories / goals.calories) * 100}
          label="Calories"
          sublabel={`${todayStats.calories} / ${goals.calories} kcal`}
          color="#FF3B30"
        />
        <ProgressBar
          progress={(todayStats.duration / goals.duration) * 100}
          label="Duration"
          sublabel={`${todayStats.duration} / ${goals.duration} mins`}
          color="#34C759"
        />
        <ProgressBar
          progress={(todayStats.workouts / goals.workouts) * 100}
          label="Workouts"
          sublabel={`${todayStats.workouts} / ${goals.workouts} sessions`}
          color="#007AFF"
        />
      </Card>
    </section>
  );
}
