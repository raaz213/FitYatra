import { createContext, ReactNode, useState, Dispatch, SetStateAction } from "react";

type WorkoutContextType = {
    workoutId: string;
    setWorkoutId: (id: string) => void;
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