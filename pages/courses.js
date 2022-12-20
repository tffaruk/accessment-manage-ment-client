import FullLayout from "@/layouts/FullLayout";
import {
  Paper,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Table,
  Button,
} from "@mui/material";
import CourseCard from "components/cards/CourseCard";
import CourseForm from "components/form/CourseForm";
import { useAppContext } from "context/state";

import React, { useEffect, useState } from "react";

const Course = () => {
  const {
    courseState: { loading, error, courses },
    courseDispatch,
  } = useAppContext();

  const [course, setCourse] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  let content;
  if (loading) {
    content = <Typography>Loading...</Typography>;
  }
  if (error) {
    content = <Typography>Something went wrong</Typography>;
  }
  if (!loading && !error && courses.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && courses.length) {
    content = courses.map((course, i) => (
      <CourseCard course={course} key={i} courseDispatch={courseDispatch} />
    ));
  }

  useEffect(() => {
    setCourse(content);
  }, [courses]);

  return (
    <FullLayout>
      <CourseForm
        open={open}
        setOpen={setOpen}
        courseDispatch={courseDispatch}
        courses={courses}
      />
      <Button
        onClick={handleOpen}
        variant="contained"
        color="primary"
        sx={{
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        +Course
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Platform</TableCell>
              <TableCell>Website</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {course}
          {/* <TableBody>{tool}</TableBody> */}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default Course;
