"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { tickerSchema } from "./schema";
import { useSocket } from "@/context/WS";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const ticker = tickerSchema.parse(row.original);
  const { setCurrentTickers, currentTickers } = useSocket();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem
          onClick={() => {
            const newTickers = new Set(currentTickers);
            newTickers.delete(ticker.product_id!);
            setCurrentTickers(newTickers);
          }}
        >
          Unsubscribe
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
