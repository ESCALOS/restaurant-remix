import { forwardRef } from "react";

type TextInputProps = {
  id: string;
  label: string;
  placeholder?: string;
  error?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, label, placeholder, error, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-primary-700"
        >
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          {...props}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
          placeholder={placeholder}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

TextInput.displayName = "TextInput";
export default TextInput;
