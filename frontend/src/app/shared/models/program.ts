import { Step } from "./step";

export interface Program {
  id?: number;
  label: string;
  description: string;
  steps: Step[];
}
