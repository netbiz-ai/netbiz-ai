import * as React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input({ label, error, className = "", id, ...props }, ref) {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium tracking-wide text-white/70"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          {...props}
          className={`h-11 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 text-sm text-white placeholder-white/30 transition focus:border-white/30 focus:bg-white/[0.05] focus:outline-none ${
            error ? "border-red-400/60" : ""
          } ${className}`}
        />
        {error && (
          <span className="text-xs text-red-400/90">{error}</span>
        )}
      </div>
    );
  }
);

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea({ label, error, className = "", id, ...props }, ref) {
    const inputId = id ?? props.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-medium tracking-wide text-white/70"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={inputId}
          {...props}
          className={`min-h-[120px] resize-y rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-3 text-sm text-white placeholder-white/30 transition focus:border-white/30 focus:bg-white/[0.05] focus:outline-none ${
            error ? "border-red-400/60" : ""
          } ${className}`}
        />
        {error && (
          <span className="text-xs text-red-400/90">{error}</span>
        )}
      </div>
    );
  }
);
