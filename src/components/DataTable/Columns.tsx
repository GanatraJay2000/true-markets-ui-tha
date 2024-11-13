"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Ticker } from "./schema";
import { DataTableColumnHeader } from "./ColumnHeader";
import { cn } from "@/lib/utils";
import { DataTableRowActions } from "./RowActions";
import { Triangle } from "lucide-react";

export const columns: ColumnDef<Ticker>[] = [
  {
    accessorKey: "product_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Id" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-100 font-thin">
        {row.getValue("product_id")}
      </div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" className="" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center space-x-1 text-xs sm:text-sm text-neutral-400 font-thin ">
          <Triangle
            className={cn("size-2 stroke-0", {
              "transform rotate-180": !row?.original?.higher,
              "fill-green-500": row?.original?.higher,
              "fill-red-500": !row?.original?.higher,
            })}
          />
          <span
            className={cn("max-w-[500px] truncate font-medium", {
              "text-green-500": row?.original?.higher,
              "text-red-500": !row?.original?.higher,
            })}
          >
            {row.getValue("price")}
          </span>
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "best_bid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Best Bid Price" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-400 font-thin">
        {row.getValue("best_bid")}
      </div>
    ),
  },
  {
    accessorKey: "best_bid_size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Best Bid Size" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-400 font-thin">
        {row.getValue("best_bid_size")}
      </div>
    ),
  },
  {
    accessorKey: "best_ask",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Best Ask Price" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-400 font-thin">
        {row.getValue("best_ask")}
      </div>
    ),
  },
  {
    accessorKey: "best_ask_size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Best Ask Size" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-400 font-thin">
        {row.getValue("best_ask_size")}
      </div>
    ),
  },

  {
    accessorKey: "last_size",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Trade Size" />
    ),
    cell: ({ row }) => (
      <div className="text-neutral-400 font-thin">
        {row.getValue("last_size")}
      </div>
    ),
  },
  {
    accessorKey: "time",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Trade Time" />
    ),
    cell: ({ row }) => (
      <div className=" text-xs sm:text-sm text-neutral-400 font-thin">
        {typeof row.getValue("time") === "string"
          ? (row.getValue("time") as string).split("T")[1].replace("Z", "")
          : ""}
      </div>
    ),
  },
  {
    id: "higher",
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
