"use client";

import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef
} from "@tanstack/react-table";

import { FixedSizeList as List } from "react-window";

type Props = {
  data: any[];
  columns: string[];
};

export const QueryResultTable = ({ data, columns }: Props) => {
  const columnDefs: ColumnDef<any>[] = columns.map((col) => ({
    accessorKey: col,
    header: col
  }));

  const table = useReactTable({
    data,
    columns: columnDefs,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="border p-2">
      <div className="grid grid-cols-4 font-bold border-b py-1">
        {table.getHeaderGroups().map((headerGroup) =>
          headerGroup.headers.map((header) => (
            <div key={header.id}>
              {flexRender(header.column.columnDef.header, header.getContext())}
            </div>
          ))
        )}
      </div>
      <List height={300} itemCount={table.getRowModel().rows.length} itemSize={35} width="100%">
        {({ index, style }) => {
          const row = table.getRowModel().rows[index];
          return (
            <div style={style} className="grid grid-cols-4 border-b text-sm py-1">
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </div>
          );
        }}
      </List>
    </div>
  );
};