export interface FeedbackDto {
  score: number;
  details: string;
  data: { [key: string]: string };
}
