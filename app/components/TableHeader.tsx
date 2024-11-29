export default function TableHeader({ columns }: { columns: string[] }) {
  return (
    <thead className="bg-accent-50">
      <tr>
        {columns.map((column) => (
          <th
            key={column}
            className="py-3 text-left text-xs font-medium uppercase tracking-wider text-primary-700"
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
}
