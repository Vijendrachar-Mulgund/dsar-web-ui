import { CaseStatus } from "@/enums/CaseStatus";

export type Case = {
  _id: string;
  title: string;
  description: string;
  status: CaseStatus;
  location: {
    type: string;
    coordinates: [number];
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
