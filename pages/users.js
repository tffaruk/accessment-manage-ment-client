// import AdminPage from "@/layouts/AdminPage";
import FullLayout from "@/layouts/FullLayout";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import UserCard from "components/cards/UserCard";
import { useAppContext } from "context/state";
import { useEffect, useState } from "react";

// import useUser from "hooks/useShowcase";
// import { Suspense } from "react";

const User = () => {
  const [user, setUser] = useState();

  const {
    userState: { loading, error, users },
    toolState: { tools },
    userDispatch,
  } = useAppContext();

  let content;
  if (loading) {
    content = <Typography>Loading...</Typography>;
  }
  if (error) {
    content = <Typography>Something went wrong</Typography>;
  }
  if (!loading && !error && users.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && users.length) {
    content = users
      .map((el) => {
        return {
          ...el,
          expand: false,
        };
      })
      .map((user) => <UserCard user={user} tools={tools} />);
  }

  useEffect(() => {
    setUser(content);
  }, [users]);

  // console.log(tools.map((t, i) => t.organization.filter((o) => o)));
  return (
    <FullLayout>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* <TableCell>Handle</TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Depertment</TableCell>
              <TableCell>Designation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{user}</TableBody>
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default User;
