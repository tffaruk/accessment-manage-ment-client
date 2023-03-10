import React, { useState } from "react";

import FormModal from "components/Modal";
import AssetForm from "components/form/AssetForm";
import Axios from "@/lib/axios";
const AddAsset = ({ open, setOpen, assetDispatch }) => {
  const [asset, setAsset] = useState({
    name: "",
    value: "",
    user: "",
    purchase_date: Date,
    issues: [
      {
        id: 1,
        issue: "",
      },
    ],
  });

  const reset = () => {
    setAsset({
      ...asset,
      name: "",
      value: "",
      user: "",
      purchase_date: Date,
      issue: [
        {
          id: 1,
          issue: "",
        },
      ],
    });
  };

  //   add asset
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await Axios.post("asset", {
      asset,
    });
    if (res.status === 200) {
      reset();
      setOpen(false);
      assetDispatch({
        type: "ADD_ASSET",
        payload: asset,
      });
    }
  };

  return (
    <FormModal width={400} open={open} setOpen={setOpen} reset={reset}>
      <AssetForm
        asset={asset}
        setAsset={setAsset}
        handleSubmit={handleSubmit}
      />
    </FormModal>
  );
};

export default AddAsset;
