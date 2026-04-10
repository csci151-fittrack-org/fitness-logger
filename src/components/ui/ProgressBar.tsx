import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  progress: number;
  color?: string;
  label: string;
  sublabel: string;
}

export const ProgressBar = ({ progress, color = "#007AFF", label, sublabel }: ProgressBarProps) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-medium text-gray-900">{label}</p>
          <p className="text-xs text-gray-500">{sublabel}</p>
        </div>
        <span className="text-sm font-bold text-gray-900">{Math.round(clampedProgress)}%</span>
      </div>
      <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
};
