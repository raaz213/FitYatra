import {
  createContext,
  ReactNode,
  useState,
} from "react";

type WorkoutContextType = {
  workoutId: string;
  categoryId: string;
  setWorkoutId: (id: string) => void;
  setCategoryId: (id: string) => void;
};

export const WorkoutContext = createContext<WorkoutContextType | undefined>(
  undefined
);

export const WorkoutContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [workoutId, setWorkoutId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");

  return (
    <WorkoutContext.Provider value={{ workoutId, setWorkoutId, categoryId, setCategoryId }}>
      {children}
    </WorkoutContext.Provider>
  );
};
