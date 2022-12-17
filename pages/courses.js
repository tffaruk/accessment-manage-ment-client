import FullLayout from "@/layouts/FullLayout";
import { useAppContext } from "context/state";
import React from "react";

const Course = () => {
  const { courseState, courseDipatch } = useAppContext();

  return (
    <FullLayout>
      {" "}
      <div>Course</div>
    </FullLayout>
  );
};

export default Course;
