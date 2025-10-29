import React, { createContext, useContext, ReactNode } from "react";
import ownerDetails from "./ownerDetails.json";

const OwnerDetailsContext = createContext(ownerDetails);

export const OwnerDetailsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <OwnerDetailsContext.Provider value={ownerDetails}>
      {children}
    </OwnerDetailsContext.Provider>
  );
};

export const useOwnerDetails = () => useContext(OwnerDetailsContext);
