import Axios from "@/lib/axios";
import React, { useEffect, useReducer } from "react";
import { userReducer } from "state/userState/userReducer";

const userStates = () => {
  const initialState = {
    loading: false,
    users: [],
    error: false,
  };
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  useEffect(() => {
    userDispatch({
      type: "FETCHING_START",
    });
    Axios.get("user")
      .then((data) =>
        userDispatch({
          type: "FETCHING_SUCCESS",
          payload: data.data.users.map((user) => {
            return { ...user, expand: false };
          }),
        })
      )
      .catch(() => userDispatch({ type: "FETCHING_FAILED" }));
  }, []);
  return {
    userState: userState,
    userDispatch: userDispatch,
  };
};

export default userStates;
