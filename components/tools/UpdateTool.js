import Axios from "@/lib/axios";
import FormModal from "components/Modal";
import { useState } from "react";
import ToolForm from "../form/ToolForm";

const ToolUpdate = ({ open, setOpen, toolDispatch, tools }) => {
  //   call users

  const [tool, setTool] = useState({
    name: tools.name,
    prize: tools.prize,
    organization: tools.organization,
  });
  // add new  organization field

  //   reset tool
  const reset = () => {
    setTool({
      ...tool,
      name: tool.name,
      prize: tool.prize,
      organization: tool.organization,
    });
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
      <ToolForm handleSubmit={handleUpdate} tool={tool} setTool={setTool} />
    </FormModal>
  );
};

export default ToolUpdate;



