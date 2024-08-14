import { User } from "@/types/auth";

export type HeaderProps = {
  me?: User | null;
};

export type MenuItem = {
  title?: string;
  path?: string;
};
