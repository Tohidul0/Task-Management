import React from "react";
import clsx from "clsx";

interface TextboxProps {
  type: string;
  placeholder?: string;
  label?: string;
  className?: string;
  name: string;
  register?: any; // TypeScript doesn't directly support spreading register in `react-hook-form`, so we assume a generic ref.
  error?: string;
}

const Textbox = React.forwardRef<HTMLInputElement, TextboxProps>(
  ({ type, placeholder, label, className, register, name, error }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1">
        {label && (
          <label htmlFor={name} className="text-slate-800">
            {label}
          </label>
        )}

        <div>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            ref={ref}
            {...register}
            aria-invalid={error ? "true" : "false"}
            className={clsx(
              "bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300",
              className
            )}
          />
        </div>
        {error && (
          <span className="text-xs text-[#f64949fe] mt-0.5 ">{error}</span>
        )}
      </div>
    );
  }
);

export default Textbox;
