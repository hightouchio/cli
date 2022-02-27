export interface Run {
  querySize: number;
  diff: {
    added: number;
    removed: number;
    changed: number;
  };
  success: {
    added: number;
    removed: number;
    changed: number;
  };
  fail: {
    added: number;
    removed: number;
    changed: number;
  };
  completionRatio: number;
}
