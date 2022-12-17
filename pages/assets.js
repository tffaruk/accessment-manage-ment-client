// import AdminPage from "@/layouts/AdminPage";
import FullLayout from "@/layouts/FullLayout";
import { useAppContext } from "context/state";
// import useTestimonial from "hooks/useTestimonial";
// import { Suspense } from "react";

const Assets = () => {
  const { assetState, assetDispatch } = useAppContext();
  console.log(assetState)
  return (
    <FullLayout>
      <p>Assets</p>
    </FullLayout>
    // <Suspense>
    //   <AdminPage type={"Assets"} currentData={Assetss} />
    // </Suspense>
  );
};

export default Assets;
