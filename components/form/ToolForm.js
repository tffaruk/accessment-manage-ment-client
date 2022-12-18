import Axios from "@/lib/axios";
import { Button, TextField, Grid, Select, MenuItem, Box } from "@mui/material";
import Label from "components/FormLabel";
import FormModal from "components/Modal";
import { useAppContext } from "context/state";
import { useState } from "react";

const ToolForm = ({ open, setOpen, toolDispatch, tools }) => {
  const {
    userState: { users },
  } = useAppContext();
  const [tool, setTool] = useState({
    name: "",
    prize: "",
    organization: {
      name: "",
      user: [],
    },
  });
  const reset = () => {
    setTool({
      ...tool,
      name: "",
      prize: "",
      organization: {
        name: "",
        user: [],
      },
    });
  };

  const handleToolUser = (e) => {
    setTool((tool) => ({
      ...tool,
      organization: {
        ...tool.organization,
        user: e.target.type === "checkbox" ? e.target.checked : e.target.value,
      },
    }));
  };
  //   add tool
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(tool);
    const res = await Axios.post("tool", {
      name: tool.name,
      prize: tool.prize,
      organization: [tool.organization],
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "ADD_TOOL",
        payload: {
          name: tool.name,
          prize: tool.prize,
          organization: [tool.organization],
        },
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
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
          <Box bgcolor="#ddd" padding={2} mb={1} borderRadius="2px">
            <Grid item xs={6}>
              <Label
                htmlFor="organization"
                required={true}
                label="Organization name"
              />
              <TextField
                id="organization"
                placeholder="organization"
                value={tool.organization.name}
                onChange={(e) =>
                  setTool({
                    ...tool,
                    organization: {
                      ...tool.organization,
                      name: e.target.value,
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
              <Label htmlFor="user" required={true} label="Select User" />

              <Select
                select
                id="user"
                variant="outlined"
                label="User"
                multiple={true}
                value={tool.organization.user}
                onChange={handleToolUser}
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
          <Button variant="contained" color="primary" fullWidth type="submit">
            Submit
          </Button>
        </Grid>
      </form>
    </FormModal>
  );
};

export default ToolForm;
