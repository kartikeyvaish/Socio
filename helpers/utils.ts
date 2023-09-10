// Packages Imports
import { MarginProps } from "../types/GlobalTypes";

export function getMarginStyles(margins: MarginProps = {}) {
  if (margins.all) {
    return {
      margin: margins.all
    }
  }

  return {
    marginTop: margins.top || 0,
    marginBottom: margins.bottom || 0,
    marginLeft: margins.left || 0,
    marginRight: margins.right || 0,
  }
}