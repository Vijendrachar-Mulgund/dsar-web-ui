import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/config/data/case-list";

import data from "../../../../public/tasks.json";

export function CaseList() {
  const tasks = data;

  const handleRedirect = (cell: any) => {
    console.log("Button Clicked ->", cell);
  };

  return (
    <div className="w-4/5 m-auto">
      <DataTable data={tasks} columns={columns} handleOnClick={handleRedirect} />
    </div>
  );
}
