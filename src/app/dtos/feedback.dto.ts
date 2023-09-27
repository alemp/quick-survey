export interface FeedbackDto {
  score?: number;
  details?: string | null;
  metadata: { [key: string]: string };
}
