import React, { createContext, useContext, useState } from 'react';

const UserProgressContext = createContext();



export function UserProgressProvider({ children }) {
  const [culturalEventsAttended, setCulturalEventsAttended] = useState(0);
  const [traditionsExplored, setTraditionsExplored] = useState(0);
  const [heritagesAttended, setHeritagesAttended] = useState(0);
  const [learningModulesCompleted, setLearningModulesCompleted] = useState(0);

  const incrementCulturalEvents = () => {
    setCulturalEventsAttended((prev) => prev + 1);
  };

  const incrementTraditionsExplored = () => {
    setTraditionsExplored((prev) => prev + 1);
  };

  const incrementHeritagesAttended = () => {
    setHeritagesAttended((prev) => prev + 1);
  };

  const incrementLearningModulesCompleted = () => {
    setLearningModulesCompleted((prev) => prev + 1);
  };

  return (
    <UserProgressContext.Provider value={{
      culturalEventsAttended,
      incrementCulturalEvents,
      traditionsExplored,
      incrementTraditionsExplored,
      heritagesAttended,
      incrementHeritagesAttended,
      learningModulesCompleted,
      incrementLearningModulesCompleted
    }}>
      {children}
    </UserProgressContext.Provider>
  );
}

export function useUserProgress() {
  return useContext(UserProgressContext);
}
