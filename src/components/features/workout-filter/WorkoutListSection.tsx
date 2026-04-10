import { Activity, Calendar, Edit2, Filter, Trash2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { motion } from 'motion/react';
import { Workout, WorkoutType } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { Button } from '@/src/components/ui/Button';
import { Card } from '@/src/components/ui/Card';

type WorkoutFilter = WorkoutType | 'All';

interface WorkoutListSectionProps {
  workouts: Workout[];
  filter: WorkoutFilter;
  onFilterChange: (filter: WorkoutFilter) => void;
  onEdit: (workout: Workout) => void;
  onDelete: (id: string) => void;
}

const filterOptions: WorkoutFilter[] = ['All', 'Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Other'];

export function WorkoutListSection({ workouts, filter, onFilterChange, onEdit, onDelete }: WorkoutListSectionProps) {
  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <Calendar size={20} className="text-[#FF9500]" />
          Recent Workouts
        </h2>
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={filter}
            onChange={(event) => onFilterChange(event.target.value as WorkoutFilter)}
            className="bg-transparent text-sm font-medium text-gray-600 outline-none"
          >
            {filterOptions.map((option) => (
              <option key={option} value={option}>
                {option === 'All' ? 'All Types' : option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {workouts.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p>No workouts found. Start logging!</p>
          </div>
        ) : (
          workouts.map((workout, idx) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <Card className="p-4 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-2xl flex items-center justify-center',
                      workout.type === 'Cardio' && 'bg-blue-50 text-blue-500',
                      workout.type === 'Strength' && 'bg-red-50 text-red-500',
                      workout.type === 'Yoga' && 'bg-green-50 text-green-500',
                      workout.type === 'Pilates' && 'bg-cyan-50 text-cyan-500',
                      workout.type === 'HIIT' && 'bg-purple-50 text-purple-500',
                      workout.type === 'Other' && 'bg-gray-50 text-gray-500',
                    )}
                  >
                    <Activity size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{workout.type}</h3>
                    <p className="text-xs text-gray-500 font-medium">
                      {format(parseISO(workout.date), 'MMM d, h:mm a')} • {workout.duration}m • {workout.calories}kcal
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" className="p-2 h-auto rounded-lg" onClick={() => onEdit(workout)}>
                    <Edit2 size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="p-2 h-auto rounded-lg text-red-400 hover:text-red-500"
                    onClick={() => onDelete(workout.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
}
