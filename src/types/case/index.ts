import { CaseStatus } from "@/enums/CaseStatus";

export type Case = {
  _id?: string;
  title?: string;
  description?: string;
  status?: CaseStatus;
  location?: {
    type?: string;
    coordinates?: [number];
  };
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
};

export type Message = {
  _id?: string;
  message?: string;
  senderType?: string;
  sender?: Sender | string;
  case?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: 0;
};

export type VideoPlayerProps = {
  src: string;
  liveVideoURL?: string;
  width?: string;
  height?: string;
  isLive?: boolean;
};

type Sender = {
  name?: string;
  id?: string;
};
