type SelectInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
};

export default function SelectInput({
  id,
  label,
  value,
  onChange,
  options,
  error,
}: SelectInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary-700">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={onChange}
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