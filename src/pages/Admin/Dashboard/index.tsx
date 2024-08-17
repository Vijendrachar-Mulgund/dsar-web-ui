import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "@/components/ui/data-table";
import { columns as userTableColumns } from "@/config/data/users";
import { columns as aiTableColumns } from "@/config/data/artificialIntelligences";
import { User } from "@/types/auth";
import { ArtificialIntelligence } from "@/types/artificialIntelligence";

export function Dashboard() {
  const dispatch = useDispatch();
  const users: User[] = useSelector((state: any) => state?.user?.users);
  const ais: ArtificialIntelligence[] = useSelector(
    (state: any) => state?.artificialIntelligence?.artificialIntelligence,
  );
  const me: User = useSelector((state: any) => state?.auth?.me);

  useEffect(() => {
    dispatch({ type: "user/getUserFetch" });
    dispatch({ type: "artificialIntelligence/getArtificialIntelligence" });
  }, [dispatch]);

  const handleRedirect = () => {};

  return (
    <div className="w-11/12 m-auto">
      <h1 className="text-4xl text-center font-bold my-20">
        Welcome, {me?.firstname} {me?.lastname}!
      </h1>

      <div className="text-muted-foreground text-center my-10">
        Here's a list of all the First Responders on the DSaR.
      </div>

      <DataTable data={users} columns={userTableColumns} handleOnClick={handleRedirect} />

      <div className="text-muted-foreground text-center my-10">
        Here's a list of all the Artificial Intelligence Models on the DSaR.
      </div>

      <DataTable data={ais} columns={aiTableColumns} handleOnClick={handleRedirect} />
    </div>
  );
}
