import React, { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useTableStore } from "~/store/tableStore";
import { Table as TableType } from "types";

interface TableCardProps {
  table: TableType & { is_persistent: boolean };
}

const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const fetcher = useFetcher<{
    table?: TableType;
    error?: string;
    message?: string;
  }>();
  const { updateTable, deleteTable } = useTableStore();
  const [isEditing, setIsEditing] = React.useState(!table.is_persistent);
  const [number, setNumber] = React.useState(table.number);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Autofocus al input
    }
  }, [isEditing]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.warning(fetcher.data.error);
        inputRef.current?.focus(); // Autofocus al input
        return;
      }
      if (fetcher.data.table) {
        updateTable({ is_persistent: true, ...fetcher.data.table }, table.id);
        toast.success(fetcher.data.message);
        setIsEditing(false);
        return;
      }
    }
  }, [fetcher.data, updateTable]);

  const handleSave = async () => {
    if (number.trim() === "") {
      toast.error("El número de la mesa no puede estar vacío");
      return;
    }

    const action = !table.is_persistent
      ? "/admin/tables/create"
      : `/admin/tables/${table.id}/edit`;
    await fetcher.submit({ number }, { method: "post", action });
  };

  const handleDelete = async () => {
    await fetcher.submit(null, {
      method: "delete",
      action: `/admin/tables/${table.id}/destroy`,
    });
    deleteTable(table.id);
  };

  return (
    <div
      className="p-4 border rounded shadow hover:shadow-md transition select-none"
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className="flex items-center justify-between">
        {isEditing ? (
          <form
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            />
          </form>
        ) : (
          <span className="text-lg font-medium text-primary-900">
            {`Mesa #${table.number || "Nueva Mesa"}${
              table.is_persistent ? "" : "*"
            }`}
          </span>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                className="text-green-500 hover:text-green-600"
                onClick={handleSave}
              >
                <Icon className="h-5 w-5" icon="tabler:check" />
              </button>
              {table.is_persistent ? (
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => setIsEditing(false)}
                >
                  <Icon className="h-5 w-5" icon="tabler:x" />
                </button>
              ) : (
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={handleDelete}
                >
                  <Icon className="h-5 w-5" icon="tabler:trash" />
                </button>
              )}
            </>
          ) : (
            <>
              <button
                className="text-accent-500 hover:text-accent-600"
                onClick={() => setIsEditing(true)}
              >
                <Icon className="h-5 w-5" icon="tabler:pencil" />
              </button>
              <button
                className="text-red-500 hover:text-red-600"
                onClick={handleDelete}
              >
                <Icon className="h-5 w-5" icon="tabler:trash" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TableCard;
