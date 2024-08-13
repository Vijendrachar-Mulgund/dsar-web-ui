import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/config/data/case-list";

import { User } from "@/types/auth";
import { Case } from "@/types/case";
import { useNavigate } from "react-router-dom";

export function CaseList() {
  const me: User | null = useSelector((state: any) => state.auth.me) as User | null;
  const cases: Case[] = useSelector((state: any) => state.cases.cases) as Case[];

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "cases/getAllCases" });
  }, []);

  const handleRedirect = (cell: any) => {
    navigate(`/case/detail/${cell?.original?._id}`);
  };

  return (
    <div className="w-4/5 m-auto">
      <h1 className="text-4xl text-center font-bold my-20">Welcome, {`${me?.firstname} ${me?.lastname}`}!</h1>

      <div className="text-muted-foreground text-center my-10">Here's a list of all the cases.</div>
      <DataTable data={cases} columns={columns} handleOnClick={handleRedirect} />
    </div>
  );
}
