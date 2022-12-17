import {
  Collapse,
  TableCell,
  TableRow,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";

const UserCard = ({ user, tools }) => {
  console.log(user.expand);
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton aria-label="expand row" size="small">
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
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={user.expand} timeout="auto" unmountOnExit>
            {tools.map((t, i) => (
              <div>
                <p key={i}>{t.name}:</p>
                {t.organization
                  .filter((o) => o.user.includes("faruk"))
                  .map((d) => (
                    <p>{d.name}</p>
                  ))}
              </div>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserCard;
