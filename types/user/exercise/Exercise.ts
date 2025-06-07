export interface Exercise {
  _id: string,
  subcategory: string;
  name: string;
  image: string;
  sets: number;
  metValue: number;
  duration: string;
  instructions: string;
  focusArea: [string];
  videoUrl: string;
}
