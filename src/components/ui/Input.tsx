import React from 'react';
import { cn } from '@/src/lib/utils';

export const Input = ({ 
  label, 
  error, 
  className,
  ...props 
}: any) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>}
    <input
      {...props}
      className={cn(
        "w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#007AFF] outline-none transition-all",
        error && "border-red-300 bg-red-50",
        className
      )}
    />
    {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
  </div>
);
