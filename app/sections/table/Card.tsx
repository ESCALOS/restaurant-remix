import React, { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";
import { useTableStore } from "~/store/tableStore";
import { Table as TableType } from "types";
import { useLoadingStore } from "~/store/loadingStore";
import { motion } from "framer-motion";
import { useAnimateFeedbackCard } from "~/hooks/useAnimateFeedbackCard";

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
  const withLoading = useLoadingStore((state) => state.withLoading);
  const { controls, animate } = useAnimateFeedbackCard();

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus(); // Autofocus al input
    }

    if (!isEditing && number.trim() === "") {
      setNumber(table.number);
    }
  }, [isEditing]);

  useEffect(() => {
    if (fetcher.data) {
      if (fetcher.data.error) {
        toast.error(fetcher.data.error);
        animate("error");
        inputRef.current?.focus(); // Autofocus al input
        return;
      }

      if (fetcher.data.table) {
        updateTable({ is_persistent: true, ...fetcher.data.table }, table.id);
        toast.success(fetcher.data.message);
        animate("success");
        setIsEditing(false);
        return;
      }

      if (fetcher.data.message) {
        toast.success(fetcher.data.message); // Mensaje del servidor
        animate("success");
        deleteTable(table.id);
        return;
      }
    }
  }, [fetcher.data]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      if (!table.is_persistent) {
        deleteTable(table.id);
      }
      setIsEditing(false);
    }
  };

  const handleSave = async () => {
    if (number.trim() === "") {
      toast.warning("El número de la mesa no puede estar vacío");
      animate("error");
      return;
    }

    //Verificar si el número ha cambiado
    if (table.number !== number) {
      const action = !table.is_persistent
        ? "/admin/tables/create"
        : `/admin/tables/${table.id}/edit`;

      await withLoading(async () => {
        await fetcher.submit({ number }, { method: "post", action });
      });
    } else {
      setIsEditing(false);
    }
  };

  const handleDelete = async () => {
    await withLoading(async () => {
      await fetcher.submit(null, {
        method: "delete",
        action: `/admin/tables/${table.id}/destroy`,
      });
    });
  };

  return (
    <motion.div
      animate={controls}
      className="p-4 border rounded shadow hover:shadow-md transition select-none"
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
              onKeyDown={handleKeyDown}
              className="border px-2 py-1 rounded w-full"
            />
          </form>
        ) : (
          <span
            className="text-lg font-medium text-primary-900"
            onDoubleClick={() => setIsEditing(true)}
          >
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
                  onClick={() => deleteTable(table.id)}
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
    </motion.div>
  );
};

export default TableCard;
