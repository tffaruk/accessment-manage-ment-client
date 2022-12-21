import Axios from "@/lib/axios";
import FormModal from "components/Modal";

import { useState } from "react";
import ToolForm from "../form/ToolForm";

const AddTool = ({ open, setOpen, toolDispatch }) => {
  const [tool, setTool] = useState({
    name: "",
    prize: "",
    organization: [
      {
        name: "",
        user: [],
        id: 1,
      },
    ],
  });

  const reset = () => {
    setTool({
      ...tool,
      name: "",
      prize: "",
      organization: [
        {
          name: "",
          user: [],
        },
      ],
    });
  };

  //   add tool
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("tool", {
      tool,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      toolDispatch({
        type: "ADD_TOOL",
        payload: tool,
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <ToolForm tool={tool} setTool={setTool} handleSubmit={handleSubmit} />
    </FormModal>
  );
};

export default AddTool;
