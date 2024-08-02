import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/components/ui/data-table/data/columns";
import data from "../../../../public/tasks.json";

export function CaseList() {
  const tasks = data;
  return (
    <div className="w-4/5 m-auto">
      <DataTable data={tasks} columns={columns} />
    </div>
  );
}