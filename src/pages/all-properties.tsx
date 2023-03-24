import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

import { PropertyCard, CustomButton } from "../components/common";

const AllProperties = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
    };
  }, [filters]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction="column" width="100%">
          <Typography fontSize={25} fontWeight={700} color="#11142d">
            {!allProperties.length
              ? "There are no properties"
              : "All Properties"}
          </Typography>
          <Box
            mb={2}
            mt={3}
            display="flex"
            width="84%"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            <TextField
              variant="outlined"
              color="info"
              placeholder="Search by title"
              value={currentFilterValues.title}
              onChange={(e) => {
                setFilters([
                  {
                    field: "title",
                    operator: "contains",
                    value: e.currentTarget.value
                      ? e.currentTarget.value
                      : undefined,
                  },
                ]);
              }}
            />
            <CustomButton
              title="Add Property"
              handleClick={() => navigate("/properties/create")}
              backgroundColor="#475be8"
              color="#fcfcfc"
              icon={<Add />}
            />
          </Box>
        </Stack>
      </Box>

      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties?.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            location={property.location}
            price={property.price}
            photo={property.photo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;
