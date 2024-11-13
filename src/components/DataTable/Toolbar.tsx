"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { useSocket } from "@/context/WS";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./ViewOptions";
import { DataTableFacetedFilter } from "./FacetedFilter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { filtered, setCurrentTickers, tickers } = useSocket();
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter Product Ids..."
          value={
            (table.getColumn("product_id")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("product_id")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]  border-neutral-700"
        />
        <DataTableFacetedFilter
          column={table.getColumn("product_id")}
          title="Tickers"
        />

        {filtered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              setCurrentTickers(new Set(tickers));
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
