"use client";
import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import { useSocket } from "@/context/WS";
import { Task } from "./schema";

function DataTableComponent() {
  const { tickerData } = useSocket();
  const data: Task[] = Object.values(tickerData);
  return <DataTable columns={columns} data={data} />;
}

export default DataTableComponent;
