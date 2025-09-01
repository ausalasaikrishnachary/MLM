import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  CardMedia,
  Typography,
  Divider,
  Button
} from "@mui/material";
import PartnerHeader from "../../../Shared/Partner/PartnerNavbar";
import { baseurl } from "../../../BaseURL/BaseURL";

const PCompareList = ({ subscriptionPaid }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const compareList = location.state?.compareList || [];

  const fields = [
    { key: "property_title", label: "Property Title" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "plot_area_sqft", label: "Plot Area (sqft)" },
    { key: "builtup_area_sqft", label: "Built-up Area (sqft)" },
    { key: "total_property_value", label: "Property Value (₹)" },
    { key: "number_of_floors", label: "Floors" },
    { key: "status", label: "Status" },
    { key: "looking_to", label: "Looking To" },
    { key: "ownership_type", label: "Ownership Type" },
    { key: "facing", label: "Facing" },
  ];

  if (compareList.length === 0) {
    return (
      <>
        <PartnerHeader />
        <Container sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6">
            No properties selected for comparison.
          </Typography>
          <Button sx={{ mt: 2 }} onClick={() => navigate(-1)} variant="contained">
            Go Back
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <PartnerHeader />
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Compare Properties
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `220px repeat(${compareList.length}, minmax(220px, 1fr))`,
            overflowX: "auto",
            border: "1px solid #ccc",
            borderRadius: 2,
            boxShadow: 1,
          }}
        >
          {/* Side headings */}
          <Box sx={{ backgroundColor: "#f5f5f5", borderRight: "1px solid #ccc" }}>
            <Box sx={{ height: 140 }} /> {/* empty space for image alignment */}
            {fields.map((f) => (
              <Box key={f.key} sx={{ py: 1, px: 2 }}>
                <Typography fontWeight={600}>{f.label}</Typography>
                <Divider />
              </Box>
            ))}
            <Box sx={{ py: 2 }} /> {/* spacing for Buy Now button alignment */}
          </Box>

          {/* Property columns */}
          {compareList.map((property, idx) => (
            <Box
              key={idx}
              sx={{
                borderRight: idx !== compareList.length - 1 ? "1px solid #ccc" : "none",
                backgroundColor: "#fff",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {/* Image */}
              <CardMedia
                component="img"
                height="140"
                image={property.images?.length ? `${baseurl}${property.images[0].image}` : "https://via.placeholder.com/200"}
                alt={property.property_title}
              />

              {/* Info rows */}
              <Box sx={{ p: 2 }}>
                {fields.map((f) => (
                  <Box key={f.key} sx={{ py: 1 }}>
                    <Typography>{property[f.key] || "-"}</Typography>
                    <Divider />
                  </Box>
                ))}

                {/* Buy Now button */}
                <Box sx={{ mt: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#149c33",
                      color: "white",
                      textTransform: "none",
                      '&:hover': { backgroundColor: "#59ed7c", color: "rgb(5,5,5)" }
                    }}
                    disabled={!subscriptionPaid || property.status !== 'available'}
                    onClick={() => navigate(`/p-bookingassets?property_id=${property.property_id}`)}
                  >
                    Buy Now
                  </Button>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
};

export default PCompareList;


