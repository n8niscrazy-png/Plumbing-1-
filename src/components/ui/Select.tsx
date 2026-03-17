"use client";

import React, { forwardRef, useId } from "react";
import { ChevronDown } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

export interface SelectOption {
  /** Value submitted with the form */
  value: string;
  /** Human-readable label */
  label: string;
  /** Disable this particular option */
  disabled?: boolean;
}

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  /** Visible label rendered above the select */
  label?: string;
  /** Placeholder text shown when no value is selected */
  placeholder?: string;
  /** Available options */
  options: SelectOption[];
  /** Error message -- when present the field displays in error state */
  error?: string;
  /** Helper text rendered below the select */
  helperText?: string;
  /** Extra wrapper classes */
  wrapperClassName?: string;
}

/* ------------------------------------------------------------------ */
/*  Styles                                                            */
/* ------------------------------------------------------------------ */

const baseSelectClasses =
  "w-full appearance-none rounded-md bg-warm-100 border border-warm-200 " +
  "px-4 py-3 pr-10 text-navy-900 font-body text-sm " +
  "transition-all duration-200 outline-none cursor-pointer " +
  "focus:border-navy-700 focus:ring-2 focus:ring-copper-500/30 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const errorSelectClasses =
  "border-emergency-500 focus:border-emergency-500 focus:ring-emergency-500/30";

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Select = forwardRef<HTMLSelectElement, SelectProps>((props, ref) => {
  const uid = useId();

  const {
    label,
    placeholder,
    options,
    error,
    helperText,
    wrapperClassName = "",
    className = "",
    ...rest
  } = props;

  const id = props.id ?? uid;
  const hasError = !!error;

  const selectClasses = [
    baseSelectClasses,
    hasError ? errorSelectClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={`flex flex-col gap-1.5 ${wrapperClassName}`}>
      {/* Label */}
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-semibold text-navy-900 font-body"
        >
          {label}
        </label>
      )}

      {/* Select wrapper */}
      <div className="relative">
        <select
          id={id}
          ref={ref}
          className={selectClasses}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
          }
          defaultValue={placeholder && !rest.value ? "" : undefined}
          {...rest}
        >
          {/* Placeholder option */}
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}

          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>

        {/* Custom chevron icon */}
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-500/60">
          <ChevronDown size={16} />
        </span>
      </div>

      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-emergency-500 font-body">
          {error}
        </p>
      )}

      {/* Helper text */}
      {!hasError && helperText && (
        <p id={`${id}-helper`} className="text-xs text-navy-500 font-body">
          {helperText}
        </p>
      )}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
