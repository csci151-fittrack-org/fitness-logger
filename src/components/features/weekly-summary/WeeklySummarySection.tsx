import { Activity, Clock, Flame, TrendingUp } from 'lucide-react';
import { WeeklyStats } from '@/src/types';
import { Card } from '@/src/components/ui/Card';

interface WeeklySummarySectionProps {
  stats: WeeklyStats;
}

export function WeeklySummarySection({ stats }: WeeklySummarySectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold flex items-center gap-2">
        <TrendingUp size={20} className="text-[#AF52DE]" />
        Weekly Summary
      </h2>
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 flex flex-col items-center text-center space-y-1">
          <Activity size={20} className="text-[#007AFF] mb-1" />
          <span className="text-xl font-bold">{stats.totalWorkouts}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Workouts</span>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center space-y-1">
          <Clock size={20} className="text-[#34C759] mb-1" />
          <span className="text-xl font-bold">{stats.totalDuration}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Minutes</span>
        </Card>
        <Card className="p-4 flex flex-col items-center text-center space-y-1">
          <Flame size={20} className="text-[#FF3B30] mb-1" />
          <span className="text-xl font-bold">{stats.totalCalories}</span>
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">Calories</span>
        </Card>
      </div>
    </section>
  );
}
