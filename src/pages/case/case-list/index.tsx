import { DataTable } from "@/components/ui/data-table";
import tasks from "../../../../public/tasks.json";
import { columns } from "@/components/ui/data-table/data/columns";

// Simulate a database read for tasks.
const theTasks = tasks;

export function CaseList() {
  console.log(theTasks);
  return (
    <div>
      <DataTable data={theTasks} columns={columns} />
    </div>
  );
}
