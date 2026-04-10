import React from 'react';
import { cn } from '@/src/lib/utils';

interface SelectProps {
  label?: string;
  options: string[];
  value?: string;
  onChange?: (val: any) => void;
  className?: string;
  name?: string;
  defaultValue?: string;
}

export const Select = ({ 
  label, 
  options, 
  value, 
  onChange,
  className,
  name,
  defaultValue
}: SelectProps) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider ml-1">{label}</label>}
    <select
      name={name}
      value={value}
      defaultValue={defaultValue}
      onChange={(e) => onChange?.(e.target.value)}
      className={cn(
        "w-full px-4 py-3 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-[#007AFF] outline-none transition-all appearance-none",
        className
      )}
    >
      {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
    </select>
  </div>
);
