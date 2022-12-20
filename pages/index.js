import { Typography } from "@mui/material";
import LoginForm from "components/LoginForm";
import FullLayout from "layouts/FullLayout";
import { useState } from "react";

export default function Index() {
  const [login, setLogin] = useState(false);
  return (
    <FullLayout>
      <Typography
        variant="h1"
        sx={{
          textAlign: "center",
        }}
      >
        Welcome to Access Management System
      </Typography>
      {/* {login ? "Welcome" : <LoginForm setLogin={setLogin} />} */}
    </FullLayout>
  );
}
