export interface GetGoalResponse {
  _id: string;
  goal: number;
  createdAt: Date;
  expiresAt: Date;
}

export interface StepCounterStatsResponse {
  steps: number;
  distance: number;
  calories: number;
  createdAt: Date;
}
