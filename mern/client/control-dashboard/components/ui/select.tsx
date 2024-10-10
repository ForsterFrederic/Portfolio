import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ className, ...props }, ref) => {
        return (
            <div className="relative">
                <select
                    className={cn(
                        "flex h-10 w-full outline-none rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none pr-8", // Added padding to the right for the icon
                        className
                    )}
                    ref={ref}
                    {...props}
                >
                    {props.children}
                </select>
                <span className="absolute inset-y-0 right-4 flex items-center justify-center pr-2 pointer-events-none top-[-14px]">
                    <svg
                        className="w-4 h-4 text-muted-foreground"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                    </svg>
                </span>
            </div>
        );
    }
);

Select.displayName = "Select";

export { Select };
