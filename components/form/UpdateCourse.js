import Axios from "@/lib/axios";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";
import CourseForm from "./CourseForm";

const CourseUpdate = ({ open, setOpen, courseDispatch, courses }) => {
  //   call users
  const {
    userState: { users },
  } = useAppContext();
  const [course, setCourse] = useState({
    platform: courses.platform,
    course: courses.course,
    credential: {
      website: courses.credential.website,
      email: courses.credential.email,
      password: courses.credential.password,
    },
  });

  //   reset course
  const reset = () => {
    setCourse({
      ...course,
      platform: course.platform,
      course: course.course,
      credential: {
        website: course.credential.website,
        email: course.credential.email,
        password: course.credential.password,
      },
    });
  };

// update course
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`course/${courses._id}`, {
      course,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      courseDispatch({
        type: "UPDATE_COURSE",
        payload: course,
        id: courses._id,
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <CourseForm
        handleSubmit={handleUpdate}
        course={course}
        setCourse={setCourse}
        users={users}
      />
    </FormModal>
  );
};

export default CourseUpdate;
