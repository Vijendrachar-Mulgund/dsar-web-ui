import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataTable } from "@/components/ui/data-table";
import { columns as userTableColumns } from "@/config/data/users";
import { columns as aiTableColumns } from "@/config/data/artificialIntelligences";
import { columns as droneTableColumns } from "@/config/data/drones";
import { User } from "@/types/auth";
import { ArtificialIntelligence } from "@/types/artificialIntelligence";
import { Drone } from "@/types/drones";
import { CreateNewFirstResponderDialog } from "@/components/modules/create-new-first-responder-dialog";
import { CreateNewAIModelDialog } from "@/components/modules/create-new-ai-model-dialog";
import { CreateNewDroneDialog } from "@/components/modules/create-new-drone-dialog";

export function Dashboard() {
  const dispatch = useDispatch();

  const users: User[] = useSelector((state: any) => state?.user?.users);
  const ais: ArtificialIntelligence[] = useSelector(
    (state: any) => state?.artificialIntelligence?.artificialIntelligence,
  );
  const me: User = useSelector((state: any) => state?.auth?.me);
  const drones: Drone[] = useSelector((state: any) => state?.drones?.drones);

  useEffect(() => {
    dispatch({ type: "user/getUserFetch" });
    dispatch({ type: "artificialIntelligence/getArtificialIntelligence" });
    dispatch({ type: "drones/getDrones" });
  }, [dispatch]);

  // Redundant function
  const handleRedirect = () => {};

  const handleCreateNewFirstResponderSubmit = (newFirstResponderPayload: any) => {
    console.log("The data in parent", newFirstResponderPayload);
  };

  const handleCreateNewAIModelSubmit = (newAIModelPayload: any) => {
    console.log("The data in parent AI model", newAIModelPayload);
  };

  const handleCreateNewDroneSubmit = (newDronePayload: any) => {
    console.log("The data in parent Drone", newDronePayload);
  };

  return (
    <div className="w-11/12 m-auto">
      <h1 className="text-4xl text-center font-bold">
        Welcome, {me?.firstname} {me?.lastname}!
      </h1>

      <div className="text-center my-5 flex justify-between content-center">
        <span className="text-2xl">First Responders</span>
        <CreateNewFirstResponderDialog submit={handleCreateNewFirstResponderSubmit} />
      </div>

      <DataTable data={users} columns={userTableColumns} handleOnClick={handleRedirect} />

      <div className="text-muted-foreground text-center my-10"></div>

      <div className="text-center my-5 flex justify-between content-center">
        <span className="text-2xl">AI Models</span>
        <CreateNewAIModelDialog submit={handleCreateNewAIModelSubmit} />
      </div>

      <DataTable data={ais} columns={aiTableColumns} handleOnClick={handleRedirect} />

      <div className="text-center my-5 flex justify-between content-center">
        <span className="text-2xl">Drones</span>
        <CreateNewDroneDialog submit={handleCreateNewDroneSubmit} />
      </div>

      <DataTable data={drones} columns={droneTableColumns} handleOnClick={handleRedirect} />
    </div>
  );
}
