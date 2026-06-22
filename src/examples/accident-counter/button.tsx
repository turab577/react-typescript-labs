import { cn } from '$/common/utilities/cn';
import type { ComponentPropsWithoutRef } from 'react';

// REVISION NOTE — typing props:
// We extend the *real* <button> props (onClick, type, disabled, etc.) with
// `ComponentPropsWithoutRef<'button'>`, then add our own `variant` prop on top.
// This means our Button accepts everything a native button does, fully typed.
type ButtonVariant = 'primary' | 'danger' | 'neutral';

type ButtonProps = ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary-400 hover:bg-primary-500 text-white',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
  neutral: 'bg-slate-500 hover:bg-slate-600 text-white',
};

export const Button = ({ variant = 'primary', className, ...props }: ButtonProps) => {
  return (
    <button
      // `...props` forwards onClick, type, disabled, children, etc. to the real button.
      // `cn(...)` merges the base styles, the variant, and any className passed in.
      className={cn(
        'rounded px-4 py-2 font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50',
        variantClasses[variant],
        className,
      )}
      {...props}
    />
  );
};
