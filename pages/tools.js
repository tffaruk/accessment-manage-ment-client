import FullLayout from "@/layouts/FullLayout";
import {
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ToolCard from "components/cards/ToolCard";
import ToolForm from "components/form/ToolForm";
import { useAppContext } from "context/state";
import React, { useEffect, useState } from "react";

const Tools = () => {
  const {
    toolState: { tools, loading, error },
    toolDispatch,
  } = useAppContext();

  const [tool, setTool] = useState();
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
  if (!loading && !error && tools.length === 0) {
    content = <Typography>Nothing to show</Typography>;
  }
  if (!loading && !error && tools.length) {
    content = tools.map((tool, i) => (
      <ToolCard tool={tool} key={i} toolDispatch={toolDispatch} />
    ));
  }

  useEffect(() => {
    setTool(content);
  }, [tools]);

  return (
    <FullLayout>
      {/* insert tool */}
      <ToolForm
        open={open}
        setOpen={setOpen}
        toolDispatch={toolDispatch}
        tools={tools}
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
        +tool
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Expand</TableCell>
              <TableCell>Tool</TableCell>
              <TableCell>Prizing</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          {tool}
          {/* <TableBody>{tool}</TableBody> */}
        </Table>
      </TableContainer>
    </FullLayout>
  );
};

export default Tools;
