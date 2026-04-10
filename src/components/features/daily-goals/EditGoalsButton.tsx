import { Target } from 'lucide-react';
import { DailyGoal } from '@/src/types';
import { Button } from '@/src/components/ui/Button';

interface EditGoalsButtonProps {
  goals: DailyGoal;
  onUpdateGoals: (goals: DailyGoal) => void;
}

export function EditGoalsButton({ goals, onUpdateGoals }: EditGoalsButtonProps) {
  const handleEditGoals = () => {
    const caloriesInput = prompt('Daily Calorie Goal?', goals.calories.toString());
    const durationInput = prompt('Daily Duration Goal (mins)?', goals.duration.toString());

    if (!caloriesInput || !durationInput) {
      return;
    }

    const nextCalories = Number.parseInt(caloriesInput, 10);
    const nextDuration = Number.parseInt(durationInput, 10);

    if (Number.isNaN(nextCalories) || Number.isNaN(nextDuration)) {
      return;
    }

    onUpdateGoals({
      ...goals,
      calories: nextCalories,
      duration: nextDuration,
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <Button
        variant="secondary"
        className="shadow-xl border border-gray-200 backdrop-blur-md bg-white/80"
        onClick={handleEditGoals}
      >
        <Target size={18} />
        Edit Goals
      </Button>
    </div>
  );
}
