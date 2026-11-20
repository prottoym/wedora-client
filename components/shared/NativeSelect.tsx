import type { SelectHTMLAttributes } from "react";

/** ShadCN Select er (Base UI) simple styled select */
export default function NativeSelect({
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`border-input bg-background focus-visible:ring-ring h-9 w-full rounded-md border px-3 text-sm outline-none focus-visible:ring-2 ${className}`}
    />
  );
}
