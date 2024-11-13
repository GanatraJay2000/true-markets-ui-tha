import DataTableComponent from "@/components/DataTable/DataTable";

export default function Home() {
  return (
    <div className="h-full w-full flex justify-center py-10 md:py-16 px-2 md:px-0 ">
      <div className="md:w-3/4 max-w-[95%]">
        <DataTableComponent />
      </div>
    </div>
  );
}
