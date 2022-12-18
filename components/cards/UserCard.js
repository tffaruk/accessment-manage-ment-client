import {
  Collapse,
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Typography,
  Grid,
} from "@mui/material";
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import UserUpdate from "components/form/UserUpdate";
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";

const UserCard = ({ user, tools, userDispatch }) => {
  const [open, setOpen] = useState(false);
  const { filterUserState, filterDisPatch } = useAppContext();
  const handleExpand = (expand, id) => {
    userDispatch({
      type: "EXPAND_USER",
      expand: expand,
      id: id,
    });
  };

  const handleOpen = (id) => {
    setOpen(true);

    filterDisPatch({
      type: "SINGLE_USER",
      id: id,
    });
  };
  const deleteUser = async (id) => {
    const res = await Axios.delete(`user/${id}`);
  
    if (res.status === 200) {
      userDispatch({
        type: "DELETE_USER",
        id: id,
      });
    }
  };
  return (
    <TableBody key={user._id}>
      {filterUserState.users.length > 0 && (
        <UserUpdate
          users={filterUserState.users[0]}
          setOpen={setOpen}
          open={open}
          userDispatch={userDispatch}
        />
      )}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!user.expand, user.id)}
          >
            <FeatherIcon
              icon={user.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.phone}</TableCell>
        <TableCell>{user.depertment}</TableCell>
        <TableCell>{user.designation}</TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(user._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => deleteUser(user._id)}>
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={user.expand} timeout="auto" unmountOnExit>
            <Typography variant="h3">Permitions:</Typography>
            {tools.map((tool, i) => (
              <Grid>
                <Typography variant="h4" key={i}>
                  {tool.name}:
                </Typography>
                {tool.organization
                  .filter((org) => org.user.includes(user.name))
                  .map((user, key) => (
                    <p key={`user-${key}`}>{user.name}</p>
                  ))}
              </Grid>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default UserCard;
