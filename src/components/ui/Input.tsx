"use client";

import React, { forwardRef, useId } from "react";
import type { LucideIcon } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface InputBaseProps {
  /** Visible label rendered above the input */
  label?: string;
  /** Helper text rendered below the input */
  helperText?: string;
  /** Error message -- when present the field displays in error state */
  error?: string;
  /** Leading icon (rendered inside the input, left side) */
  leadingIcon?: LucideIcon;
  /** Trailing icon (rendered inside the input, right side) */
  trailingIcon?: LucideIcon;
  /** Extra wrapper classes */
  wrapperClassName?: string;
}

export interface InputProps
  extends InputBaseProps,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Explicitly set to distinguish from TextareaProps */
  as?: "input";
}

export interface TextareaProps
  extends InputBaseProps,
    React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  as: "textarea";
  rows?: number;
}

export type FieldProps = InputProps | TextareaProps;

/* ------------------------------------------------------------------ */
/*  Shared styles                                                     */
/* ------------------------------------------------------------------ */

const baseFieldClasses =
  "w-full rounded-md bg-warm-100 border border-warm-200 px-4 py-3 " +
  "text-navy-900 placeholder:text-navy-500/50 font-body text-sm " +
  "transition-all duration-200 outline-none " +
  "focus:border-navy-700 focus:ring-2 focus:ring-copper-500/30 " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

const errorFieldClasses =
  "border-emergency-500 focus:border-emergency-500 focus:ring-emergency-500/30";

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FieldProps
>((props, ref) => {
  const uid = useId();

  const {
    label,
    helperText,
    error,
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    wrapperClassName = "",
    className = "",
    ...rest
  } = props;

  const id = props.id ?? uid;
  const hasError = !!error;

  const fieldClasses = [
    baseFieldClasses,
    hasError ? errorFieldClasses : "",
    LeadingIcon ? "pl-10" : "",
    TrailingIcon ? "pr-10" : "",
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

      {/* Field wrapper (for icon positioning) */}
      <div className="relative">
        {/* Leading icon */}
        {LeadingIcon && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-500/60">
            <LeadingIcon size={16} />
          </span>
        )}

        {/* Render textarea or input */}
        {(rest as TextareaProps).as === "textarea" ? (
          (() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { as: _tag, ...textareaRest } = rest as TextareaProps & {
              as: string;
            };
            return (
              <textarea
                id={id}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                className={`${fieldClasses} resize-y min-h-[100px]`}
                aria-invalid={hasError || undefined}
                aria-describedby={
                  hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
                }
                rows={(textareaRest as TextareaProps).rows ?? 4}
                {...(textareaRest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
              />
            );
          })()
        ) : (
          (() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { as: _tag, ...inputRest } = rest as InputProps & {
              as?: string;
            };
            return (
              <input
                id={id}
                ref={ref as React.Ref<HTMLInputElement>}
                className={fieldClasses}
                aria-invalid={hasError || undefined}
                aria-describedby={
                  hasError ? `${id}-error` : helperText ? `${id}-helper` : undefined
                }
                {...(inputRest as React.InputHTMLAttributes<HTMLInputElement>)}
              />
            );
          })()
        )}

        {/* Trailing icon */}
        {TrailingIcon && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-navy-500/60">
            <TrailingIcon size={16} />
          </span>
        )}
      </div>

      {/* Error message */}
      {hasError && (
        <p id={`${id}-error`} className="text-xs text-emergency-500 font-body">
          {error}
        </p>
      )}

      {/* Helper text (hidden when error is shown) */}
      {!hasError && helperText && (
        <p id={`${id}-helper`} className="text-xs text-navy-500 font-body">
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
