"use client";
import React from "react";
import { kesyTransactions } from "@/mocks/transactions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultColumns } from "@/components/tables/transactions-columndef";

function TransactionTable() {
  const table = useReactTable({
    columns: defaultColumns,
    data: kesyTransactions,
    getCoreRowModel: getCoreRowModel(),
  });
  if (kesyTransactions.length === 0) {
    return (
      <div className="px-4 mt-4">
        <h1 className="">No transactions found</h1>
      </div>
    );
  }
  return (
    <div className="px-4 mt-4">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-4 text-left">
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
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionTable;
