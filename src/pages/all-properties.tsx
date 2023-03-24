import { Add } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { CustomButton } from "components/common";
import React from "react";
import { useNavigate } from "react-router-dom";

const AllProperties = () => {
  const navigate = useNavigate();

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography fontSize={25} fontWeight={700} color="#11142d">
        All Properties
      </Typography>
      <CustomButton
        title="Add Property"
        handleClick={() => navigate("/properties/create")}
        backgroundColor="#475be8"
        color="#fcfcfc"
        icon={<Add />}
      />
    </Stack>
  );
};

export default AllProperties;
