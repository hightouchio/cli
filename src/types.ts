export interface Run {
  querySize: number;
  status: string;
  plannedRows: {
    addedCount: number;
    removedCount: number;
    changedCount: number;
  };
  successfulRows: {
    addedCount: number;
    removedCount: number;
    changedCount: number;
  };
  failedRows: {
    addedCount: number;
    removedCount: number;
    changedCount: number;
  };
  completionRatio: number;
  error: string;
}
