import * as React from "react";
import { Column } from "@tanstack/react-table";
import { Check, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useSocket } from "@/context/WS";

interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
}

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const facets = column?.getFacetedUniqueValues();
  const { tickers, currentTickers, setCurrentTickers } = useSocket();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 border-dashed  border-neutral-700"
        >
          <PlusCircle />
          {title}
          {currentTickers?.size > 0 && (
            <>
              <Separator orientation="vertical" className="mx-2 h-4" />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {currentTickers.size}
              </Badge>
              <div className="hidden space-x-1 lg:flex">
                {currentTickers.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {currentTickers.size} selected
                  </Badge>
                ) : (
                  tickers
                    .filter((option) => currentTickers.has(option))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[200px] p-0 border-neutral-700"
        align="start"
      >
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {tickers.map((option) => {
                const isSelected = currentTickers.has(option);
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      if (isSelected) {
                        currentTickers.delete(option);
                      } else {
                        currentTickers.add(option);
                      }
                      setCurrentTickers(new Set(currentTickers));
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary ",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    <span>{option}</span>
                    {facets?.get(option) && (
                      <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                        {facets.get(option)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {currentTickers.size < tickers.length && (
              <>
                <CommandSeparator className="border-neutral-700" />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => setCurrentTickers(new Set(tickers))}
                    className="justify-center text-center"
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
