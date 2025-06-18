import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type WorkoutContextType = {
    workoutId: string;
    setWorkoutId: Dispatch<SetStateAction<string>>;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutContextProvider = ({ children }: { children: ReactNode }) => {
    const [workoutId, setWorkoutId] = useState<string>('');
    console.log(workoutId);
    return (
        <WorkoutContext.Provider value={{ workoutId, setWorkoutId }}>
            {children}
        </WorkoutContext.Provider>
    );
};