// Modules imports
import { createContext } from "react";

// Local Imports
import { GlobalContextProps } from "../types/ContextTypes";

// initial value
const defaultValue = {}

// Context
const GlobalContext = createContext<GlobalContextProps>(defaultValue);

// exports
export default GlobalContext;
