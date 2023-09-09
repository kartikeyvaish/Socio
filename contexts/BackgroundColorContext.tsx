// Packages imports
import { createContext } from "react";

export interface BackgroundColorContextType {
  animatedStyles?: {
    backgroundColor: string;
  };
}

const BackgroundColorContext = createContext<BackgroundColorContextType>({});

export default BackgroundColorContext;
