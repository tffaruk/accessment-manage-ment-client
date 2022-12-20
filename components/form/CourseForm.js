import Axios from "@/lib/axios";
import {
  Button,
  TextField,
  Grid,
  Select,
  MenuItem,
  Box,
  IconButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Label from "components/FormLabel";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";

const CourseForm = ({ open, setOpen, courseDispatch }) => {
  const {
    userState: { users },
  } = useAppContext();
  const [course, setCourse] = useState({
    platform: "",
    courses: [
      {
        name: "",
        prize: null,
        user: [],
        purchase_date: Date,
        expire_date: Date,
      },
    ],
    credential: {
      website: "",
      email: "",
      password: "",
    },
  });

  // add courses field
  const addCourses = () => {
    setCourse({
      ...course,
      courses: [
        ...course.courses,
        {
          id: course.courses.length + 1,
          name: "",
          prize: null,
          user: [],
          purchase_date: Date,
          expire_date: Date,
        },
      ],
    });
  };
  //   delete courses field
  const deletecourses = (id) => {
    if (course.courses.map((course) => course.id).includes(id)) {
      setCourse({
        ...course,
        courses: course.courses.filter((course) => course.id !== id),
      });
    }
  };
  //   reset course form
  const reset = () => {
    setCourse({
      ...course,
      platform: "",
      courses: [
        {
          name: "",
          prize: null,
          user: [],
          purchase_date: Date,
          expire_date: Date,
        },
      ],
      credential: {
        website: "",
        email: "",
        password: "",
      },
    });
  };

  const handleCourseUser = (e, name, id) => {
    setCourse((course) => ({
      ...course,
      courses: course.courses.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            user:
              data.name === name
                ? e.target.type === "checkbox"
                  ? e.target.checked
                  : e.target.value
                : data.user,
          };
        } else {
          return {
            ...data,
            user: data.user,
          };
        }
      }),
    }));
  };
  //   add course
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("course", {
      course,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      courseDispatch({
        type: "ADD_COURSE",
        payload: course,
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <form
        onSubmit={handleSubmit}
        style={{
          overflowY: "auto",

          margin: "auto",
          maxHeight: "100%",
        }}
      >
        <Grid>
          <Grid item xs={6}>
            <Label htmlFor="platform" required={true} label="platform" />
            <TextField
              id="platform"
              placeholder="platform"
              value={course.platform}
              onChange={(e) =>
                setCourse({ ...course, platform: e.target.value })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <Label htmlFor="website" required={true} label="website" />
            <TextField
              id="website"
              placeholder="website"
              value={course.credential.website}
              onChange={(e) =>
                setCourse({
                  ...course,
                  credential: {
                    ...course.credential,
                    website: e.target.value,
                  },
                })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="email" required={true} label="email" />
            <TextField
              id="email"
              placeholder="email"
              value={course.credential.email}
              onChange={(e) =>
                setCourse({
                  ...course,
                  credential: {
                    ...course.credential,
                    email: e.target.value,
                  },
                })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="password" required={true} label="password" />
            <TextField
              id="password"
              placeholder="password"
              value={course.credential.password}
              onChange={(e) =>
                setCourse({
                  ...course,
                  credential: {
                    ...course.credential,
                    password: e.target.value,
                  },
                })
              }
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>

          {course.courses.map((courseData, i) => (
            <Box bgcolor="#ddd" padding={2} mb={1} borderRadius="2px" key={i}>
              <IconButton
                size="small"
                onClick={() => deletecourses(courseData.id)}
                sx={{
                  float: "right",
                  marginTop: "-16px",
                  marginRight: "-15px",
                }}
              >
                <FeatherIcon icon="x" size={16} style={{ color: "red" }} />
              </IconButton>
              <Grid item xs={6}>
                <Label htmlFor="courses" required={true} label="courses name" />
                <TextField
                  id="courses"
                  placeholder="courses"
                  value={courseData.name}
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courses: course.courses.map((el) => {
                        return {
                          ...el,
                          name:
                            courseData.id === el.id ? e.target.value : el.name,
                        };
                      }),
                    })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Label
                  htmlFor="courses-prizes"
                  required={true}
                  label="courses prize"
                />
                <TextField
                  id="courses-prize"
                  placeholder="courses prize"
                  value={courseData.prize}
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courses: course.courses.map((el) => {
                        return {
                          ...el,
                          prize:
                            courseData.id === el.id ? e.target.value : el.prize,
                        };
                      }),
                    })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Label
                  htmlFor="purchase_date"
                  required={true}
                  label="Purchase Date"
                />
                <TextField
                  id="purchase_date"
                  placeholder="Purchase Date"
                  type="date"
                  value={courseData.purchase_date}
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courses: course.courses.map((el) => {
                        return {
                          ...el,
                          purchase_date:
                            courseData.id === el.id
                              ? e.target.value
                              : el.purchase_date,
                        };
                      }),
                    })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <Label
                  htmlFor="expire_date"
                  required={true}
                  label="Expire Date"
                />
                <TextField
                  id="expire_date"
                  placeholder="Expire Date"
                  type="date"
                  value={courseData.expire_date}
                  onChange={(e) =>
                    setCourse({
                      ...course,
                      courses: course.courses.map((el) => {
                        return {
                          ...el,
                          expire_date:
                            courseData.id === el.id
                              ? e.target.value
                              : el.expire_date,
                        };
                      }),
                    })
                  }
                  sx={{
                    marginBottom: "10px",
                  }}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={6}>
                <Label htmlFor="user" required={true} label="Select User" />

                <Select
                  select
                  id="user"
                  variant="outlined"
                  label="User"
                  multiple={true}
                  value={courseData.user}
                  onChange={(e) =>
                    handleCourseUser(e, courseData.name, courseData.id)
                  }
                  placeholder="Select User"
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>
                    <em>Users</em>
                  </MenuItem>
                  {users.map((user, i) => (
                    <MenuItem value={user.name} key={i}>
                      {user.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Box>
          ))}

          <Button onClick={addCourses}>Add more</Button>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </FormModal>
  );
};

export default CourseForm;
