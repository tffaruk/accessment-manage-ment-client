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

const ToolUpdate = ({ open, setOpen, toolDispatch, tools }) => {
//   call users
    const {
    userState: { users },
  } = useAppContext();
  const [tool, setTool] = useState({
    name: tools.name,
    prize: tools.prize,
    organization: tools.organization,
  });
  // add new  organization field
  const addOrganization = () => {
    setTool({
      ...tool,
      organization: [
        ...tool.organization,
        { name: "", user: [], id: tool.organization.length + 1 },
      ],
    });
  };
  //   delete organization field
  const deleteOrganization = (id) => {
    if (tool.organization.map((org) => org.id).includes(id)) {
      setTool({
        ...tool,
        organization: tool.organization.filter((org) => org.id !== id),
      });
    }
  };

  //   reset tool
  const reset = () => {
    setTool({
      ...tool,
      name: tool.name,
      prize: tool.prize,
      organization: tool.organization,
    });
  };

  //   multiple user select
  const handleToolUser = (e, name, id) => {
    setTool((tool) => ({
      ...tool,
      organization: tool.organization.map((data) => {
        if (data._id === id) {
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
  //   add tool
  const handleUpdate = async (e) => {
    e.preventDefault();

    const res = await Axios.patch(`tool/${tools._id}`, {
      tool,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "UPDATE_TOOL",
        payload: tool,
        id: tools._id,
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <form
        onSubmit={handleUpdate}
        style={{
          overflowY: "auto",

          margin: "auto",
          maxHeight: "100%",
        }}
      >
        <Grid>
          <Grid item xs={6}>
            <Label htmlFor="name" required={true} label="name" />
            <TextField
              id="name"
              placeholder="name"
              value={tool.name}
              onChange={(e) => setTool({ ...tool, name: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
              type="name"
            />
          </Grid>
          <Grid item xs={6}>
            <Label htmlFor="prize" required={true} label="prize" />
            <TextField
              id="prize"
              placeholder="prize"
              value={tool.prize}
              onChange={(e) => setTool({ ...tool, prize: e.target.value })}
              sx={{
                marginBottom: "10px",
              }}
              fullWidth
              required
            />
          </Grid>
          {tool.organization.map((org, i) => (
            <Box bgcolor="#ddd" padding={2} mb={1} borderRadius="2px" key={i}>
              <IconButton
                size="small"
                onClick={() => deleteOrganization(org.id)}
                sx={{
                  float: "right",
                  marginTop: "-16px",
                  marginRight: "-15px",
                }}
              >
                <FeatherIcon icon="x" size={16} style={{ color: "red" }} />
              </IconButton>
              <Grid item xs={6}>
                <Label
                  htmlFor="organization"
                  required={true}
                  label="Organization name"
                />
                <TextField
                  id="organization"
                  placeholder="organization"
                  value={org.name}
                  onChange={(e) =>
                    setTool({
                      ...tool,
                      organization: tool.organization.map((el) => {
                        return {
                          ...el,
                          name: org._id === el._id ? e.target.value : el.name,
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
                  value={org.user}
                  onChange={(e) => handleToolUser(e, org.name, org._id)}
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
          <Button onClick={addOrganization}>Add more</Button>
          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </FormModal>
  );
};

export default ToolUpdate;
