import { forwardRef } from "react";

type SelectInputProps = {
  label: string;
  options: { value: string | number; label: string }[];
  error?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ id, label, options, error, ...props }, ref) => {
    return (
      <div>
        <label
          htmlFor={id}
          className="block text-sm font-medium text-primary-700"
        >
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          {...props}
          className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

SelectInput.displayName = "SelectInput";
export default SelectInput;
