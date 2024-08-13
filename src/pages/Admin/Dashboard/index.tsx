import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/config/data/users";

export function Dashboard() {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state?.user?.users);

  useEffect(() => {
    dispatch({ type: "user/getUserFetch" });
  }, [dispatch]);

  const handleRedirect = () => {};

  return (
    <div className="w-4/5 m-auto">
      <h1 className="text-4xl text-center font-bold my-20">Welcome, User Name!</h1>

      <div className="text-muted-foreground text-center my-10">
        Here's a list of all the First responders on the DSaR.
      </div>

      <DataTable data={users} columns={columns} handleOnClick={handleRedirect} />
    </div>
  );
}
