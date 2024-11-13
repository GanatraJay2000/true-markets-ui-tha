"use client";
import React from "react";
import { DataTable } from "../ui/data-table";
import { columns } from "./Columns";
import { Task } from "./schema";
import { demoData } from "./data";

function DataTableComponent() {
  const data: Task[] = [demoData];
  return <DataTable columns={columns} data={data} />;
}

export default DataTableComponent;
