type TextInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

export default function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  error,
}: TextInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-primary-700">
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full rounded-md border border-primary-300 px-3 py-2 text-sm focus:border-accent-500 focus:outline-none focus:ring-1 focus:ring-accent-500"
        placeholder={placeholder}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}