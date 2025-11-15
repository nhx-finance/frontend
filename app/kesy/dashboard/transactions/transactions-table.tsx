"use client";
import React from "react";
import { kesyTransactions } from "@/mocks/transactions";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultColumns } from "@/components/tables/transactions-columndef";
import { useMyTransactions } from "@/hooks/kesy/useTransactions";
import { Skeleton } from "@/components/ui/skeleton";

function TransactionTable() {
  const { data: transactions, isLoading, error } = useMyTransactions("user");
  const table = useReactTable({
    columns: defaultColumns,
    data: transactions ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="px-4 mt-4">
        <Skeleton className="w-1/2 md:w-1/3 h-10 mt-2 mb-8" />
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="w-full h-10 my-2" />
        ))}
      </div>
    );
  }
  if (kesyTransactions.length === 0) {
    return (
      <div className="px-4 mt-4">
        <h1 className="">No transactions found</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-4 mt-4">
        <h1 className="text-red-500 font-funnel-display">
          Error: {error.message}
        </h1>
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
