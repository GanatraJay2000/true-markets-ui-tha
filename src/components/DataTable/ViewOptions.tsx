"use client";

import { useEffect, useState } from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { snakeToTitle } from "@/lib/strManipulation";
import { shouldHideOnMobile } from "@/lib/constants";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize column visibility based on screen size
    const isSmallScreen = window.innerWidth < 1024;
    const initialVisibility = table.getAllColumns().reduce((acc, column) => {
      // Hide specified columns on small screens
      shouldHideOnMobile.includes(column.id);
      acc[column.id] = isSmallScreen ? !shouldHideOnMobile : true;
      handleVisibilityChange(column.id, acc[column.id]);
      return acc;
    }, {} as Record<string, boolean>);
    initialVisibility.higher = false;
    setColumnVisibility(initialVisibility);
    table.setColumnVisibility(initialVisibility);
  }, []);

  const handleVisibilityChange = (columnId: string, visible: boolean) => {
    const newVisibility = {
      ...columnVisibility,
      [columnId]: visible,
    };
    setColumnVisibility(newVisibility);
    table.setColumnVisibility(newVisibility);
  };

  return (
    <div className="lg:flex items-center lg:space-x-4">
      <span className="hidden lg:block">{currentTime.toUTCString()}</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto h-8 flex  border-neutral-700"
          >
            <Settings2 />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-[150px] border-neutral-700"
        >
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator className="border-neutral-700" />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={columnVisibility[column.id]}
                onCheckedChange={(value) =>
                  handleVisibilityChange(column.id, !!value)
                }
              >
                {snakeToTitle(column.id)}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}