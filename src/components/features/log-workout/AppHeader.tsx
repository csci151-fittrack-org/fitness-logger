import { Plus } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '@/src/components/ui/Button';

interface AppHeaderProps {
  onOpenWorkoutForm: () => void;
}

export function AppHeader({ onOpenWorkoutForm }: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#F2F2F7]/80 backdrop-blur-xl border-b border-gray-200 px-6 py-4">
      <div className="max-w-2xl mx-auto flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Fitness Logger</h1>
          <p className="text-sm text-gray-500 font-medium">{format(new Date(), 'EEEE, MMMM do')}</p>
        </div>
        <Button onClick={onOpenWorkoutForm} className="rounded-full w-12 h-12 p-0">
          <Plus size={24} />
        </Button>
      </div>
    </header>
  );
}
