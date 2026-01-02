import type { ColumnDef } from "@tanstack/react-table";
import type { TableRow } from "../../types/table";
import { formatTime } from "../../utils/formatTime";

export const columns: ColumnDef<TableRow>[] = [
  /* ===== SELECT ===== */
  {
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        className="table-checkbox"
        checked={table.getIsAllPageRowsSelected()}
        onChange={table.getToggleAllPageRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) =>
      row.depth === 0 ? (
        <input
          type="checkbox"
          className="table-checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ) : null,
    enableSorting: false,
  },

  /* ===== EXPAND ===== */
  {
    id: "expander",
    header: "",
    cell: ({ row }) =>
      row.getCanExpand() ? (
        <button
          className={`expander ${row.getIsExpanded() ? "expanded" : ""}`}
          onClick={row.getToggleExpandedHandler()}
          aria-label="Toggle row"
        />
      ) : null,
    enableSorting: false,
  },

  /* ===== ID ===== */
  {
    accessorKey: "id",
    header: "ID",
  },

  /* ===== EMAIL ===== */
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => ("email" in row.original ? row.original.email : "-"),
  },

  /* ===== STATUS ===== */
  {
    accessorKey: "status",
    header: "Status",
    filterFn: "equals", // 🔑 REQUIRED for column filtering
    cell: ({ row }) => {
      if (!("status" in row.original)) return "-";
      const status = row.original.status;
      return <span className={`status ${status.toLowerCase()}`}>{status}</span>;
    },
  },

  /* ===== LAST UPDATED ===== */
  {
    accessorKey: "lastUpdated",
    header: "Last Updated",
    cell: ({ row }) =>
      "lastUpdated" in row.original
        ? formatTime(row.original.lastUpdated)
        : "-",
    sortingFn: "datetime",
  },
];
