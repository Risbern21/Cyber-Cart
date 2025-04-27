import { createContext, Dispatch, SetStateAction } from "react";

export interface showSideSectionInterface {
  showSideSection: boolean;
  setshowSideSection: Dispatch<SetStateAction<boolean>>;
}

const defaultState = {
  showSideSection: false,
  setshowSideSection: () => {},
  // setshowSideSection: (showSideSection: boolean) => {},
} as showSideSectionInterface;

export const showSideSectionContext = createContext(defaultState);