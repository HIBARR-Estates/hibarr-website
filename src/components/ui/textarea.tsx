import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, title, error, ...props }: React.ComponentProps<"textarea"> & { title?: string, error?: string }) {
  return (
    <div className={"relative flex flex-col items-start gap-1"}>
      {title && <label htmlFor={props.id} className={cn("text-sm text-muted-foreground")}>{title} {props.required && <span className="text-destructive text-xs">*</span>}</label>}
      <textarea
        data-slot="textarea"
        className={cn(
          "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}

export { Textarea }
