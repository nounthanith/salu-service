import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const Input = ({ label, error, ...props }: InputProps) => {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className="text-[13px] font-semibold text-foreground/80 ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                <input
                    {...props}
                    className={`
            w-full px-4 py-1.5 text-[14px]
            bg-background text-foreground
            border-2 border-foreground/10 rounded-md
            outline-hidden transition-all duration-200
            placeholder:text-foreground/40
            focus:border-foreground focus:ring-2 focus:ring-foreground/5
            ${error ? 'border-danger focus:border-danger focus:ring-danger/10' : ''}
            ${props.disabled ? 'opacity-50 cursor-not-allowed bg-foreground/5' : ''}
          `}
                />
            </div>

            {error && (
                <span className="text-[12px] text-danger font-medium ml-1">
                    {error}
                </span>
            )}
        </div>
    );
};

export default Input;