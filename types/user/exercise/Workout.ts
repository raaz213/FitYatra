import { User } from "../../auth/auth";
import { Exercise } from "./Exercise";

export interface Workout {
_id : string;
user : User;
exercise : Exercise;
startTime : Date;
duration : number;
caloriesBurned : number;
endTime? : Date;
}