import { useAppContext } from "context/state";
import { useState } from "react";
import {
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Typography,
  Grid,
  ListItem,
  ListItemText,
  List,
} from "@mui/material";

import FeatherIcon from "feather-icons-react";
import Axios from "@/lib/axios";
import CourseUpdate from "components/form/UpdateCourse";
import SingleCourseUpdateForm from "components/form/SingleCourseUpdateForm";

const CourseCard = ({ course }) => {
  const [open, setOpen] = useState(false);
  const {
    courseDispatch,

    filterCoursesState: { courses: filterCourses, course: singleCourse },
    filterCoursesDisPatch,
  } = useAppContext();
  console.log(singleCourse);
  // expand card
  const handleExpand = (expand, id) => {
    courseDispatch({
      type: "EXPAND_COURSE",
      expand: expand,
      id: id,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    setOpen(true);
    console.log(id);
    if (id === course._id) {
      filterCoursesDisPatch({
        type: "SINGLE_COURSES",
        id: course._id,
      });
    } else {
      filterCoursesDisPatch({
        type: "SINGLE_COURSE_ITEM",
        id: course._id,
        courseId: id,
      });
    }
  };

  // delete tool
  const deleteCorse = async (id) => {
    const res = await Axios.delete(`course/${id}`);

    if (res.status === 200) {
      courseDispatch({
        type: "DELETE_COURSE",
        id: id,
      });
    }
  };

  return (
    <TableBody key={course._id}>
      {filterCourses.length > 0 && (
        <CourseUpdate
          courses={filterCourse[0]}
          setOpen={setOpen}
          open={open}
          courseDispatch={courseDispatch}
        />
      )}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!course.expand, course._id)}
          >
            <FeatherIcon
              icon={course.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{course.platform}</TableCell>
        <TableCell>{course.credential.website}</TableCell>
        <TableCell>{course.credential.email}</TableCell>
        <TableCell>{course.credential.password}</TableCell>

        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(course._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => deleteCorse(course._id)}>
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={course.expand} timeout="auto" unmountOnExit>
            {/* {singleCourse.length > 0 && (
              <OrganiztionUpdateForm
                width={400}
                open={open}
                setOpen={setOpen}
                filterOrg={filterOrg[0]}
              />
            )} */}
            {singleCourse.length > 0 && (
              <SingleCourseUpdateForm
                width={400}
                open={open}
                setOpen={setOpen}
                singleCourse={singleCourse[0]}
              />
            )}

            <Typography variant="h3">Courses:</Typography>
            {course.course.map((course, i) => (
              <Grid
                key={i}
                sx={{
                  backgroundColor: "#ddd",
                  marginBottom: "10px",
                  padding: "15px",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                  }}
                >
                  {" "}
                  <Typography variant="h4" mr={3}>
                    {course.name}
                  </Typography>{" "}
                  <IconButton
                    size="small"
                    onClick={() => handleOpen(course._id)}
                  >
                    <FeatherIcon icon="edit" style={{ color: "green" }} />
                  </IconButton>{" "}
                  <IconButton
                    size="small"
                    onClick={() => deletetool(course._id)}
                  >
                    <FeatherIcon icon="trash" style={{ color: "red" }} />
                  </IconButton>
                </Grid>
                <Typography>users:</Typography>

                <List>
                  {course.user.map((user, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText primary={user} />
                    </ListItem>
                  ))}
                </List>
                <Typography>Prize:{course.prize}</Typography>
              </Grid>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default CourseCard;
