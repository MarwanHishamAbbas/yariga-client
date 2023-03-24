import { Add } from "@mui/icons-material";
import { Stack, Typography } from "@mui/material";
import { CustomButton, PropertyCard } from "components/common";
import { useNavigate } from "react-router-dom";
import { useTable } from "@refinedev/core";
import { Box } from "@mui/system";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();

  const allProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading....</Typography>;
  if (isError) return <Typography>Error!!</Typography>;

  return (
    <Box>
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
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property.id}
            title={property.title}
            location={property.location}
            photo={property.photo}
            price={property.price}
            id={property.id}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;
