import { DroneModel } from "@/enums/DroneModel";

export type Drone = {
  name?: string;
  model?: DroneModel;
  serialNumber?: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id?: string;
  __v?: number;
};
