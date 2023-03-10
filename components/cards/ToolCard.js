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
import { useAppContext } from "context/state";
import Axios from "@/lib/axios";
import OrganiztionUpdateForm from "components/form/OrganiztionUpdateForm";
import ToolUpdate from "components/tools/UpdateTool";

const ToolCard = ({ tool }) => {
  const [open, setOpen] = useState(false);
  const [orgFrom, setOrgForm] = useState(false);
  const {
    toolDispatch,
    filterOrganizationDisPatch,
    filterOrganizationState: { organization: filterOrg, tools: filterTool },
  } = useAppContext();
  // expand card
  const handleExpand = (expand, id) => {
    toolDispatch({
      type: "EXPAND_TOOL",
      expand: expand,
      id: id,
    });
  };

  // open form modal
  const handleOpen = (id) => {
    if (id === tool._id) {
      setOpen(true);
      filterOrganizationDisPatch({
        type: "SINGLE_TOOL",
        id: tool._id,
      });
    } else {
      setOrgForm(true);
      filterOrganizationDisPatch({
        type: "SINGLE_ORGANIZATION",
        toolId: tool._id,
        orgId: id,
      });
    }
  };

  // delete tool
  const deletetool = async (id) => {
    const res = await Axios.delete(`tool/${id}`);

    if (res.status === 200) {
      toolDispatch({
        type: "DELETE_TOOL",
        id: id,
      });
    }
  };
  const deleteOrg = async (id) => {
    const res = await Axios.patch(`tool/organization/delete/${tool._id}`, {
      id,
    });

    if (res.status === 200) {
      toolDispatch({
        type: "DELETE_ORG",
        id: id,
      });
    }
  };

  return (
    <TableBody key={tool._id}>
      {filterTool.length > 0 && (
        <ToolUpdate
          tools={filterTool[0]}
          setOpen={setOpen}
          open={open}
          toolDispatch={toolDispatch}
        />
      )}
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
            {filterOrg.length > 0 && (
              <OrganiztionUpdateForm
                width={400}
                open={orgFrom}
                setOpen={setOrgForm}
                filterOrg={filterOrg[0]}
              />
            )}
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
                <Grid
                  sx={{
                    display: "flex",
                  }}
                >
                  {" "}
                  <Typography variant="h4" mr={3}>
                    {org.name}
                  </Typography>{" "}
                  <IconButton size="small" onClick={() => handleOpen(org._id)}>
                    <FeatherIcon icon="edit" style={{ color: "green" }} />
                  </IconButton>{" "}
                  <IconButton size="small" onClick={() => deleteOrg(org._id)}>
                    <FeatherIcon icon="trash" style={{ color: "red" }} />
                  </IconButton>
                </Grid>
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
