import LoginForm from "components/LoginForm";
import FullLayout from "layouts/FullLayout";
import { useState } from "react";

export default function Index() {
  const [login, setLogin] = useState(false);
  return (
    <FullLayout>
      Welcome to Access Management System
      {/* {login ? "Welcome" : <LoginForm setLogin={setLogin} />} */}
    </FullLayout>
  );
}
