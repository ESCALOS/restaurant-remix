
export default function TableRow({ data }: { data: (string | JSX.Element)[] }) {
  return (
    <tr>
      {data.map((item, index) => (
        <td key={index} className="whitespace-nowrap px-6 py-4">
          {typeof item === "string" ? (
            <div className="text-sm text-primary-700">{item}</div>
          ) : (
            item
          )}
        </td>
      ))}
    </tr>
  );
}