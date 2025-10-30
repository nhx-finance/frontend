"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { defaultColumns as columns } from "@/components/tables/wallet-columndef";
import { wallets as data } from "@/mocks/wallets";
import React from "react";
import { useRouter } from "next/navigation";

function Wallets() {
  const router = useRouter();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  const onRowClick = () => {
    router.push(`/kesy/dashboard/wallets`);
  };
  return (
    <div className="mt-10 rounded-3xl border border-foreground/20 p-4">
      <h1 className="text-xl font-funnel-display font-bold">Wallets</h1>
      <p className="text-sm font-funnel-display text-muted-foreground">
        Only whitelisted wallets can receive KESY tokens
      </p>
      <div className="w-full overflow-x-auto">
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
              <tr
                key={row.id}
                className="border-b hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                onClick={() => onRowClick()}
              >
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
    </div>
  );
}

export default Wallets;
