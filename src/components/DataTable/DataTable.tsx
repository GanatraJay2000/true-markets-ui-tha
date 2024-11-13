"use client";
import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import { useSocket } from "@/context/WS";
import { Ticker } from "./schema";

function DataTableComponent() {
  const { tickerData } = useSocket();
  const data: Ticker[] = Object.values(tickerData);
  return <DataTable columns={columns} data={data} />;
}

export default DataTableComponent;
