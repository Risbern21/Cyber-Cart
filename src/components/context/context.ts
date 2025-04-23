import { createContext, Dispatch, SetStateAction } from "react";
import { ProductInterface } from "@/types";

export interface showSideSectionInterface {
  showSideSection: boolean;
  setshowSideSection: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  showSideSection: false,
  setshowSideSection: (showSideSection: boolean) => {},
} as showSideSectionInterface;

export const showSideSectionContext = createContext(defaultState);
