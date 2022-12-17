import FullLayout from "@/layouts/FullLayout";
import { useAppContext } from "context/state";
import React from "react";

const Tools = () => {
  const { toolState, toolDispatch } = useAppContext();
  console.log(toolState);
  return (
    <FullLayout>
      <div>Tools</div>
    </FullLayout>
  );
};

export default Tools;
