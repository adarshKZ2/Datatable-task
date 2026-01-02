import {
  useReactTable,
  getCoreRowModel,
  getExpandedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState, useMemo } from "react";
import type { Customer } from "../../types";
import type { TableRow } from "../../types/table";
import { columns } from "./columns";
import "./DataTable.css";

type Props = {
  data: Customer[];
};

export function DataTable({ data }: Props) {
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "All" | "Active" | "Inactive"
  >("All");
  const [sorting, setSorting] = useState<any[]>([]);
  const [columnFilters, setColumnFilters] = useState<any[]>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 25,
  });

  /* Normalize customers + orders */
  const tableData = useMemo<TableRow[]>(
    () =>
      data.map((customer) => ({
        ...customer,
        subRows: customer.orders.map((order) => ({
          ...order,
        })),
      })),
    [data]
  );

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      rowSelection,
      globalFilter,
      columnFilters,
      sorting,
      pagination,
    },
    enableRowSelection: (row) => row.depth === 0,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getSubRows: (row) => row.subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    /* Global search ONLY for ID + Email */
    globalFilterFn: (row, _, value) => {
      if (row.depth > 0) return false;
      const v = value.toLowerCase();
      return (
        row.original.id.toLowerCase().includes(v) ||
        ("email" in row.original &&
          row.original.email.toLowerCase().includes(v))
      );
    },
  });

  return (
    <>
      {/* ===== TOOLBAR ===== */}
      <div className="toolbar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search Email or Customer ID"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => {
            const value = e.target.value as "All" | "Active" | "Inactive";
            setStatusFilter(value);

            setColumnFilters(
              value === "All"
                ? []
                : [
                    {
                      id: "status",
                      value,
                    },
                  ]
            );
          }}
        >
          <option value="All">Status: All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <button
          onClick={() =>
            setSorting((prev) => [
              {
                id: "lastUpdated",
                desc: prev[0]?.desc ? false : true,
              },
            ])
          }
        >
          Sort by: Last Updated {sorting[0]?.desc ? "▼" : "▲"}
        </button>
        <span className="selected-count">
          {Object.keys(rowSelection).length} customers selected
        </span>
      </div>

      {/* ===== TABLE ===== */}
      <table>
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={row.depth > 0 ? "child-row" : ""}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Prev
        </button>
        <span>Page {table.getState().pagination.pageIndex + 1}</span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
      </div>
    </>
  );
}
