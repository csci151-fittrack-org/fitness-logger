import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Input } from './ui/Input';
import { Workout, WorkoutType } from '@/src/types';

interface WorkoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (workout: Omit<Workout, 'id' | 'date'>) => void;
  editingWorkout: Workout | null;
}

export const WorkoutForm = ({ isOpen, onClose, onSubmit, editingWorkout }: WorkoutFormProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">{editingWorkout ? 'Edit Workout' : 'Log Workout'}</h2>
              <Button variant="ghost" className="p-2 rounded-full" onClick={onClose}>
                <X size={24} />
              </Button>
            </div>

            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                onSubmit({
                  type: formData.get('type') as WorkoutType,
                  duration: parseInt(formData.get('duration') as string),
                  calories: parseInt(formData.get('calories') as string),
                  notes: formData.get('notes') as string
                });
              }}
            >
              <Select 
                label="Workout Type"
                name="type"
                defaultValue={editingWorkout?.type || 'Cardio'}
                options={['Cardio', 'Strength', 'Yoga', 'Pilates', 'HIIT', 'Other']}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Duration (mins)" 
                  name="duration"
                  type="number" 
                  required
                  defaultValue={editingWorkout?.duration || ''}
                  placeholder="30"
                />
                <Input 
                  label="Calories" 
                  name="calories"
                  type="number" 
                  required
                  defaultValue={editingWorkout?.calories || ''}
                  placeholder="250"
                />
              </div>

              <Input 
                label="Notes (Optional)" 
                name="notes"
                defaultValue={editingWorkout?.notes || ''}
                placeholder="How did it feel?"
              />

              <div className="pt-4">
                <Button type="submit" className="w-full py-4 text-lg">
                  {editingWorkout ? 'Save Changes' : 'Log Workout'}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
