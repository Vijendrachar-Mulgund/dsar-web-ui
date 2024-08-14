import { Role } from "@/enums/Role";

export type LoginPayload = {
  email?: string;
  password?: string;
};

export type User = {
  _id?: string;
  email?: string;
  isDefaultPassword?: boolean;
  firstname?: string;
  lastname?: string;
  isAccountActive?: boolean;
  role?: string | Role.admin | Role.teamMember | Role.teamLeader;
  createdAt?: string | Date;
  updatedAt?: string | Date;
  lastLogin?: string | null | Date;
  __v?: number;
};
