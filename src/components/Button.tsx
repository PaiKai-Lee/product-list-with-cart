import { cn } from './utils';
import * as React from 'react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export default function Button({ className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        `flex cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-custom-red bg-custom-red px-6 py-2 font-semibold text-white`,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
