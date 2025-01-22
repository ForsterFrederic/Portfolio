import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, ...props }, ref) => {
        return (
            <textarea
                className={cn(
                    "flex w-full rounded-md border border-input bg-background px-2 py-3 ring-offset-background placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
                    className
                )}
                rows={4}
                ref={ref}
                {...props}
            />
        )
    }
)
Textarea.displayName = "Textarea"

export { Textarea }