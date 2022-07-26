export interface Wash {
  id?: number;
  programId?: number;
  programName?: string;
  paymentProvider: string;
  cost: number;
  length?: number;
  userId: number;
}
