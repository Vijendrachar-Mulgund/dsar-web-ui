import { ArtificialIntelligenceModel } from "@/enums/ArtificialIntelligenceModel";

export type ArtificialIntelligence = {
  _id: string;
  name: string;
  model: ArtificialIntelligenceModel;
  description: string;
  parameters: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  __v: 0;
};
