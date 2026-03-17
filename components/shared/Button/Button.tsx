import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    children: ReactNode;
};

export default function Button({ children, ...props }: ButtonProps) {
    return (
        <button className="
        group relative overflow-hidden 
        bg-foreground text-background 
        px-2 py-1 text-[12px] font-bold rounded-sm border border-foreground
        transition-colors duration-300
      " {...props}>
            {/* The sliding background layer */}
            <span className="
          absolute inset-0 z-0 
          translate-x-full bg-background 
          transition-transform duration-500 ease-out 
          group-hover:translate-x-0
        " />

            <span className="relative z-10 transition-colors duration-300 group-hover:text-foreground">
                {children}
            </span>
        </button>
    );
}