import assetsState from "@/state/assetState/assetState";
import coursesState from "@/state/courseState/courseState";
import toolsState from "@/state/toolsState/toolsState";
import filterUser from "@/state/userState/filterUser";
import { createContext, useContext } from "react";
import userStates from "state/userState/userState";

const AppContext = createContext();
export const AppWrapper = ({ children }) => {
  const { userState, userDispatch } = userStates();
  const { toolState, toolDispatch } = toolsState();
  const { courseState, courseDispatch } = coursesState();
  const { assetState, assetDispatch } = assetsState();
  const { filterUserState, filterDisPatch } = filterUser(userState.users);
  let state = {
    // users
    userState,
    userDispatch,
    // for single user
    filterUserState,
    filterDisPatch,
    // tools
    toolState,
    toolDispatch,
    // course
    courseState,
    courseDispatch,
    // assets
    assetState,
    assetDispatch,
  };
  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
