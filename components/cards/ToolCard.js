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
import { useState } from "react";
import FeatherIcon from "feather-icons-react";
// import toolUpdate from "components/form/toolUpdate";
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";

const ToolCard = ({ tool, tools, toolDispatch }) => {
  // const [open, setOpen] = useState(false);
  // const { filtertoolState, filterDisPatch } = useAppContext();
  const handleExpand = (expand, id) => {
    toolDispatch({
      type: "EXPAND_TOOL",
      expand: expand,
      id: id,
    });
  };

  // const handleOpen = (id) => {
  //   setOpen(true);

  //   filterDisPatch({
  //     type: "SINGLE_tool",
  //     id: id,
  //   });
  // };
  const deletetool = async (id) => {
    const res = await Axios.delete(`tool/${id}`);
    console.log(res);
    if (res.status === 200) {
      toolDispatch({
        type: "DELETE_TOOL",
        id: id,
      });
    }
  };
  return (
    <TableBody key={tool._id}>
      {/* {filtertoolState.tools.length > 0 && (
        <toolUpdate
          tools={filtertoolState.tools[0]}
          setOpen={setOpen}
          open={open}
          toolDispatch={toolDispatch}
        />
      )} */}
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => handleExpand(!tool.expand, tool._id)}
          >
            <FeatherIcon
              icon={tool.expand ? "minus-square" : "square"}
              style={{ color: "#ddd" }}
            />
          </IconButton>
        </TableCell>
        <TableCell>{tool.name}</TableCell>
        <TableCell>{tool.prize}</TableCell>

        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => handleOpen(tool._id)}>
            <FeatherIcon icon="edit" style={{ color: "green" }} />
          </IconButton>
        </TableCell>
        <TableCell>
          {" "}
          <IconButton size="small" onClick={() => deletetool(tool._id)}>
            <FeatherIcon icon="trash" style={{ color: "red" }} />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: 0 }}
          colSpan={8}
        >
          <Collapse in={tool.expand} timeout="auto" unmountOnExit>
            <Typography variant="h3">Organizations:</Typography>
            {tool.organization.map((org, i) => (
              <Grid
                key={i}
                sx={{
                  backgroundColor: "#ddd",
                  marginBottom: "10px",
                  padding: "15px",
                }}
              >
                <Typography variant="h4">{org.name}</Typography>
                <Typography>users:</Typography>

                <List>
                  {org.user.map((user, i) => (
                    <ListItem key={i} disableGutters>
                      <ListItemText primary={user} />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            ))}
          </Collapse>
        </TableCell>
      </TableRow>
    </TableBody>
  );
};

export default ToolCard;
