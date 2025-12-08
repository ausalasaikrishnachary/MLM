import React, { useState } from "react";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  IconButton,
  Divider,
  Switch,
  FormControlLabel,
  Checkbox,
  Stack,
  Collapse,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import FilterListIcon from "@mui/icons-material/FilterList";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PlaceIcon from "@mui/icons-material/Place";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import PhotoIcon from "@mui/icons-material/Photo";
import CollectionsIcon from "@mui/icons-material/Collections"; // Added this import
import { Select, MenuItem } from "@mui/material";

const UiProps = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isTablet = useMediaQuery(theme.breakpoints.between("md", "lg"));
  
  const [showFilters, setShowFilters] = useState(!isMobile);
  
  // ========== ADD GALLERY STATE ==========
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [selectedPropertyForGallery, setSelectedPropertyForGallery] = useState(null);
  // ========================================

  // filter states
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedBedrooms, setSelectedBedrooms] = useState([]);
  const [selectedPropertyType, setSelectedPropertyType] = useState([
    "Residential Apartment",
  ]);
  const [selectedAvailability, setSelectedAvailability] = useState([]);
  const [selectedPostedBy, setSelectedPostedBy] = useState([]);
  const [selectedFurnishing, setSelectedFurnishing] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([
    "Parking",
    "Power Backup",
    "Lift",
  ]);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [showMoreLocalities, setShowMoreLocalities] = useState(false);

  // UI section collapse states
  const [openSections, setOpenSections] = useState({
    budget: true,
    bedrooms: true,
    propertyType: true,
    availableFor: true,
    postedBy: true,
    furnishing: true,
    localities: true,
    bathrooms: true,
    amenities: true,
    photos: true,
  });

  // sample data - UPDATED with more images
  const localities = [
    "Nanakramguda",
    "Kondapur",
    "Kokapet",
    "Gachibowli",
    "Nallagandla",
    "Manikonda",
    "Old Mumbai Highway",
    "Narsingi",
    "Bachupally",
    "Raidurg",
  ];

  const amenities = [
    "Parking",
    "Power Backup",
    "Lift",
    "Park",
    "Vaastu Compliant",
    "Gym",
    "Swimming Pool",
    "Security",
    "Club House",
    "Play Area",
    "Intercom",
    "Fire Safety",
    "Water Storage",
  ];

  const properties = [
    {
      id: 1,
      name: "Rajapushpa Provincia ★4.0",
      type: "3 BHK Flat for rent in Narsingi, Hyderabad",
      price: "₹71,000 / month",
      deposit: "+ Deposit 2 months rent",
      area: "2,020 sqft (188 sqm)",
      areaType: "Super Built-up Area",
      bhk: "3 BHK",
      baths: "3 Baths",
      nearby: ["Raidurg metro station", "Inorbit mall, cyber...", "+3"],
      description: "Explore this amicable rajapushpa provincia of narsingi in...",
      posted: "Dealer · 1w ago",
      postedBy: "Dreamzarrow Horn...",
      isVerified: true,
      isOwner: false,
      hasPhotos: true,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: 2,
      name: "Alkapur Township",
      type: "2 BHK Flat for rent in Manikonda, Hyderabad",
      price: "₹35,000 / month",
      deposit: "+ Deposit 2 months rent",
      area: "1,300 sqft (121 sqm)",
      areaType: "Super Built-up Area",
      bhk: "2 BHK",
      baths: "2 Baths",
      nearby: ["Hanuman Temple", "Anjali Gardens Colony", "+3"],
      description: "Find this 2 bhk apartment for rent in manikonda, hyderabad. Th...",
      posted: "Dealer · 3d ago",
      postedBy: "INDUS Property Man...",
      isVerified: false,
      isOwner: false,
      hasPhotos: true,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: 3,
      name: "Aakriti Miro",
      type: "3 BHK Flat for rent in Nallagandla, Hyderabad",
      price: "₹65,000 / month",
      deposit: "+ Deposit 2 months rent",
      area: "2,163 sqft (201 sqm)",
      areaType: "Super Built-up Area",
      bhk: "3 BHK",
      baths: "3 Baths",
      nearby: ["Raidurg Metro Station", "Sarath City Capital...", "+3"],
      description: "Classy interiors very tastefully done. Lots of ventilation, vastu an...",
      posted: "24hrs ago",
      postedBy: "Owner",
      isVerified: false,
      isOwner: true,
      hasPhotos: true,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      ],
    },
    {
      id: 4,
      name: "Risinia Skyon ★38",
      type: "3 BHK Flat for rent in Bachupally, Hyderabad",
      price: "₹40,000 / month",
      deposit: "+ Deposit 3 months rent",
      area: "1,665 sqft (155 sqm)",
      areaType: "Carpet Area",
      bhk: "3 BHK",
      baths: "3 Baths",
      nearby: ["Myapur Metro Station", "GSM Mall & Multi...", "+3"],
      description: "Resinia skyon is centrally located in the heart of Bachupally. It is ...",
      posted: "2d ago",
      postedBy: "Owner",
      isVerified: false,
      isOwner: true,
      hasPhotos: true,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560448204-9e8b2beae1b6?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1598928506312-4d73a4f9b1c2?auto=format&fit=crop&w=800&q=60",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=60",
      ],
    },
  ];

  const popularLocalities = [
    { name: "Manikonda", price: "₹15k - 87k / mo.", searches: "6% Searches" },
    { name: "Old Mumbai Highway", price: "₹10k - 1L / mo." },
    { name: "Narsingi", price: "₹13k - 1L / mo." },
  ];

  const topRatedLocalities = [
    { name: "Bangalore Highway", reviews: "400+ reviews" },
    { name: "Hi Tech City", price: "₹15k - 1.3L / mo." },
    { name: "Old Mumbai...", price: "₹10k - 1.3L / mo.", reviews: "26+ reviews" },
  ];

  // helper toggle function
  const toggleSelection = (array, setArray, item) => {
    if (array.includes(item)) {
      setArray(array.filter((i) => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ========== ADD GALLERY FUNCTIONS ==========
  const handleOpenGallery = (property) => {
    setSelectedPropertyForGallery(property);
    setGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setGalleryOpen(false);
    setSelectedPropertyForGallery(null);
  };
  // ===========================================

  // FilterChip component
  const FilterChip = ({ label, selected, onClick }) => (
    <Chip
      label={label}
      clickable
      color={selected ? "primary" : "default"}
      onClick={onClick}
      variant={selected ? "filled" : "outlined"}
      sx={{ 
        fontSize: 12, 
        height: 28,
        borderRadius: 1,
        '& .MuiChip-label': {
          px: 1,
        }
      }}
    />
  );

  // ========== GALLERY DIALOG COMPONENT ==========
  const GalleryDialog = () => {
    if (!selectedPropertyForGallery) return null;

    return (
      <Dialog 
        open={galleryOpen} 
        onClose={handleCloseGallery}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ pb: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6" fontWeight={700}>
              {selectedPropertyForGallery.name} - Photos
            </Typography>
            <IconButton onClick={handleCloseGallery} size="small">
              <ExpandMoreIcon sx={{ transform: "rotate(90deg)" }} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {selectedPropertyForGallery.images.length} photos available
          </Typography>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 2 }}>
          <Grid container spacing={2}>
            {selectedPropertyForGallery.images.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    position: "relative",
                    height: 200,
                    borderRadius: 1,
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={`Property image ${index + 1}`}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.3s",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 8,
                      bgcolor: "rgba(0,0,0,0.7)",
                      color: "white",
                      px: 1,
                      py: 0.5,
                      borderRadius: 0.5,
                      fontSize: 12,
                    }}
                  >
                    Image {index + 1}
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseGallery} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  // ---------------------------------------------------
  // Filters panel component
  // ---------------------------------------------------
  const FiltersPanel = () => {
    const bedroomOptions = [
      "1 RK/1 BHK",
      "2 BHK",
      "3 BHK",
      "4 BHK",
      "5 BHK",
      "6 BHK",
      "7+ BHK",
    ];

    return (
      <Card
        sx={{
          width: "100%",
          maxWidth: 320,
          borderRadius: 2,
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          p: 2,
          position: isMobile ? "static" : "sticky",
          top: isMobile ? 0 : 24,
          maxHeight: isMobile ? "80vh" : "none",
          overflowY: isMobile ? "auto" : "visible",
          overflowX: "hidden",
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#555',
          },
          zIndex: 10,
          mb: isMobile ? 2 : 0,
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <FilterListIcon color="primary" sx={{ fontSize: 20 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1rem" }}>
            Filters
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Button 
            size="small" 
            sx={{ fontSize: 12, minWidth: 0 }}
            onClick={() => {
              setSelectedLocalities([]);
              setSelectedBedrooms([]);
              setSelectedPropertyType(["Residential Apartment"]);
              setSelectedAvailability([]);
              setSelectedPostedBy([]);
              setSelectedFurnishing([]);
              setSelectedAmenities(["Parking", "Power Backup", "Lift"]);
              setShowMoreAmenities(false);
              setShowMoreLocalities(false);
            }}
          >
            Clear
          </Button>
        </Box>

        {/* Hide already seen */}
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography fontWeight={600} sx={{ fontSize: "0.9rem" }}>Hide already seen</Typography>
          <Switch size="small" />
        </Box>

        {/* Budget */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("budget")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Budget</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.budget ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

<Collapse in={openSections.budget}>
  <Box sx={{ mt: 0.5, display: "flex", gap: 0.5, alignItems: "center" }}>
    <Select
      size="small"
      value=""
      displayEmpty
      sx={{ 
        flex: 1,
        fontSize: 12,
        height: 32,
        '& .MuiSelect-select': {
          padding: '6px 8px'
        }
      }}
    >
      <MenuItem value="" sx={{ fontSize: 12 }}>
        No min
      </MenuItem>
      <MenuItem value={1000} sx={{ fontSize: 12 }}>₹1,000</MenuItem>
      <MenuItem value={2000} sx={{ fontSize: 12 }}>₹2,000</MenuItem>
      <MenuItem value={3000} sx={{ fontSize: 12 }}>₹3,000</MenuItem>
      <MenuItem value={4000} sx={{ fontSize: 12 }}>₹4,000</MenuItem>
      <MenuItem value={5000} sx={{ fontSize: 12 }}>₹5,000</MenuItem>
    </Select>

    <Typography sx={{ fontSize: 12, color: "#666", minWidth: 20, textAlign: "center" }}>
      to
    </Typography>

    <Select
      size="small"
      value=""
      displayEmpty
      sx={{ 
        flex: 1,
        fontSize: 12,
        height: 32,
        '& .MuiSelect-select': {
          padding: '6px 8px'
        }
      }}
    >
      <MenuItem value="" sx={{ fontSize: 12 }}>
        No max
      </MenuItem>
      <MenuItem value={1000} sx={{ fontSize: 12 }}>₹1,000</MenuItem>
      <MenuItem value={2000} sx={{ fontSize: 12 }}>₹2,000</MenuItem>
      <MenuItem value={3000} sx={{ fontSize: 12 }}>₹3,000</MenuItem>
      <MenuItem value={4000} sx={{ fontSize: 12 }}>₹4,000</MenuItem>
      <MenuItem value={5000} sx={{ fontSize: 12 }}>₹5,000</MenuItem>
    </Select>
  </Box>
</Collapse>
        </Box>

        <Divider />

        {/* Bedrooms */}
        <Box sx={{ mt: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("bedrooms")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>No. of Bedrooms</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.bedrooms ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.bedrooms}>
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 0.5, 
              mt: 1,
              alignItems: "center" 
            }}>
              {bedroomOptions.slice(0, 5).map((b) => (
                <FilterChip 
                  key={b} 
                  label={b} 
                  selected={selectedBedrooms.includes(b)} 
                  onClick={() => toggleSelection(selectedBedrooms, setSelectedBedrooms, b)} 
                />
              ))}
              <Typography
                onClick={() => setSelectedBedrooms((prev) => prev.concat(bedroomOptions.slice(5)))}
                sx={{ 
                  color: "primary.main", 
                  cursor: "pointer", 
                  fontSize: 12,
                  ml: 0.5,
                  fontWeight: 500 
                }}
              >
                + 5 more
              </Typography>
            </Box>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Property Type */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("propertyType")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Type of property</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.propertyType ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.propertyType}>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {["Residential Apartment", "Independent House/Villa", "Independent/Builder Floor", "1 RK/ Studio Apartment", "Serviced Apartments"].map((p) => (
                <Box key={p}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small" 
                        checked={selectedPropertyType.includes(p)} 
                        onChange={() => toggleSelection(selectedPropertyType, setSelectedPropertyType, p)} 
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                        {p}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                </Box>
              ))}
            </Stack>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Available for */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("availableFor")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Available for</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.availableFor ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.availableFor}>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {["Family", "Single Women", "Single Men", "Tenants with Company Lease"].map((a) => (
                <FormControlLabel
                  key={a}
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedAvailability.includes(a)} 
                      onChange={() => toggleSelection(selectedAvailability, setSelectedAvailability, a)} 
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                      {a}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              ))}
            </Stack>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Posted by */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("postedBy")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Posted by</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.postedBy ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.postedBy}>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {["Owner", "Builder", "Dealer", "Feature Dealer"].map((p) => (
                <FormControlLabel
                  key={p}
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedPostedBy.includes(p)} 
                      onChange={() => toggleSelection(selectedPostedBy, setSelectedPostedBy, p)} 
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                      {p}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              ))}
            </Stack>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Furnishing */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("furnishing")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Furnishing status</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.furnishing ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.furnishing}>
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 0.5, 
              mt: 1,
              alignItems: "center" 
            }}>
              {["Semifurnished", "Furnished", "Unfurnished"].map((f) => (
                <FilterChip 
                  key={f} 
                  label={f} 
                  selected={selectedFurnishing.includes(f)} 
                  onClick={() => toggleSelection(selectedFurnishing, setSelectedFurnishing, f)} 
                />
              ))}
            </Box>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Localities */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("localities")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Localities</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.localities ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.localities}>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {localities.slice(0, showMoreLocalities ? localities.length : 5).map((loc) => (
                <FormControlLabel
                  key={loc}
                  control={
                    <Checkbox 
                      size="small" 
                      checked={selectedLocalities.includes(loc)} 
                      onChange={() => toggleSelection(selectedLocalities, setSelectedLocalities, loc)} 
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                      {loc}
                    </Typography>
                  }
                  sx={{ m: 0 }}
                />
              ))}
              <Button 
                size="small" 
                onClick={() => setShowMoreLocalities((s) => !s)} 
                sx={{ 
                  alignSelf: "flex-start", 
                  color: "primary.main",
                  fontSize: 12,
                  fontWeight: 500,
                  p: 0,
                  minWidth: 0,
                  mt: 0.5
                }}
              >
                {showMoreLocalities ? "Show Less" : "More Localities"}
              </Button>
            </Stack>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Bathrooms */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("bathrooms")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>No. of bathrooms</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.bathrooms ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.bathrooms}>
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 0.5, 
              mt: 1,
              alignItems: "center" 
            }}>
              {["1+", "2+", "3+", "4+", "5+"].map((b) => (
                <Button 
                  key={b} 
                  variant="outlined" 
                  size="small"
                  sx={{ 
                    fontSize: 11.5,
                    height: 28,
                    minWidth: 42,
                    borderRadius: 1 
                  }}
                >
                  {b}
                </Button>
              ))}
            </Box>
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Amenities */}
        <Box sx={{ mb: 2 }}>
          <Box 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              cursor: "pointer",
              minHeight: 32,
              mb: 0.5 
            }} 
            onClick={() => toggleSection("amenities")}
          >
            <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Amenities</Typography>
            <IconButton size="small" sx={{ p: 0.5 }}>
              {openSections.amenities ? 
                <ExpandMoreIcon sx={{ transform: "rotate(180deg)", fontSize: 18 }} /> : 
                <ExpandMoreIcon sx={{ fontSize: 18 }} />
              }
            </IconButton>
          </Box>

          <Collapse in={openSections.amenities}>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {(showMoreAmenities ? amenities : amenities.slice(0, 5)).map((a) => (
                <Grid item xs={6} key={a}>
                  <FormControlLabel
                    control={
                      <Checkbox 
                        size="small" 
                        checked={selectedAmenities.includes(a)} 
                        onChange={() => toggleSelection(selectedAmenities, setSelectedAmenities, a)} 
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ fontSize: 12.5 }}>
                        + {a}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                </Grid>
              ))}
            </Grid>

            {amenities.length > 5 && (
              <Button 
                size="small" 
                sx={{ 
                  mt: 1, 
                  fontSize: 12,
                  fontWeight: 500,
                  p: 0,
                  minWidth: 0 
                }} 
                onClick={() => setShowMoreAmenities((s) => !s)}
              >
                {showMoreAmenities ? "Show Less" : `+ ${amenities.length - 5} more`}
              </Button>
            )}
          </Collapse>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Properties with photos */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          minHeight: 32 
        }}>
          <Typography fontWeight={700} sx={{ fontSize: "0.9rem" }}>Properties with photos</Typography>
          <Switch size="small" defaultChecked />
        </Box>
      </Card>
    );
  };

  // ---------------------------------------------------
  // Property Card component
  // ---------------------------------------------------
 const PropertyCard = ({ property }) => {
    return (
      <Card sx={{ 
        borderRadius: 2, 
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        overflow: "hidden",
        mb: 2.5,
        width: "100%",
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.1)",
        }
      }}>
        <CardContent sx={{ p: 0 }}>
          <Grid container>
            {/* Left image - UPDATED HEIGHT */}
            <Grid item xs={12} md={5}>
              <Box sx={{ 
                position: "relative", 
                height: { xs: 250, md: 280 }, // Increased height to match screenshot
                bgcolor: "#f2f5f7",
                width: "100%"
              }}>
                <CardMedia
                  component="img"
                  image={property.images && property.images.length ? property.images[0] : ""}
                  alt={property.name}
                  sx={{ 
                    width: "100%", 
                    height: "100%", 
                    objectFit: "cover" 
                  }}
                />
                
                {/* Top right icons */}
                <Box sx={{ 
                  position: "absolute", 
                  top: 12, 
                  right: 12, 
                  display: "flex", 
                  gap: 1 
                }}>
                  <IconButton sx={{ 
                    bgcolor: "rgba(255,255,255,0.95)",
                    "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                    width: 36,
                    height: 36 
                  }}>
                    <FavoriteBorderIcon fontSize="small" />
                  </IconButton>
                  
                  {/* Gallery Icon Button - NEW */}
                  {property.images && property.images.length > 1 && (
                    <IconButton 
                      sx={{ 
                        bgcolor: "rgba(255,255,255,0.95)",
                        "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                        width: 36,
                        height: 36 
                      }}
                      onClick={() => handleOpenGallery(property)}
                    >
                      <CollectionsIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
                
                {/* Property info overlay */}
                <Box sx={{ 
                  position: "absolute", 
                  bottom: 0, 
                  left: 0, 
                  right: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                  color: "white",
                  p: 2,
                  pt: 4
                }}>
                  <Typography variant="caption" sx={{ 
                    fontSize: 11,
                    opacity: 0.9 
                  }}>
                    PROPERTY ({property.images?.length || 0}) &nbsp;&nbsp; SOCIETY (64)
                  </Typography>
                </Box>
                
                {/* Thumbnail indicators - UPDATED */}
                {property.images && property.images.length > 1 && (
                  <Box sx={{ 
                    position: "absolute", 
                    bottom: 12, 
                    left: 12, 
                    display: "flex", 
                    gap: 0.5,
                    alignItems: "center"
                  }}>
                    {[...Array(Math.min(4, property.images.length))].map((_, i) => (
                      <Box 
                        key={i}
                        sx={{ 
                          width: i === 0 ? 6 : 4, 
                          height: i === 0 ? 6 : 4, 
                          borderRadius: "50%",
                          bgcolor: i === 0 ? "primary.main" : "rgba(255,255,255,0.5)",
                          border: "1px solid rgba(255,255,255,0.8)"
                        }}
                      />
                    ))}
                    {property.images.length > 4 && (
                      <Typography variant="caption" sx={{ 
                        color: "white", 
                        fontSize: 10,
                        ml: 0.5 
                      }}>
                        +{property.images.length - 4}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>

            {/* Right details - UPDATED LAYOUT */}
            <Grid item xs={12} md={7}>
              <Box sx={{ 
                p: { xs: 2, md: 2.5 }, 
                height: "100%", 
                display: "flex", 
                flexDirection: "column" 
              }}>
                {/* Top row: Title + Price */}
                <Box sx={{ 
                  display: "flex", 
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  mb: 2,
                  gap: 2
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
                      <Typography sx={{ 
                        fontWeight: 700,
                        fontSize: { xs: "1.1rem", md: "1.2rem" }
                      }}>
                        {property.name}
                      </Typography>
                      {property.isVerified && (
                        <CheckCircleIcon sx={{ 
                          color: "success.main", 
                          fontSize: 18 
                        }} />
                      )}
                    </Box>
                    <Typography color="text.secondary" sx={{ 
                      fontSize: { xs: "0.9rem", md: "0.95rem" },
                      lineHeight: 1.3,
                      mb: 1
                    }}>
                      {property.type}
                    </Typography>
                    
                    {/* Featured badge */}
                    {property.id === 1 && (
                      <Chip
                        label="FEATURED"
                        size="small"
                        sx={{
                          bgcolor: "#FFE7E7",
                          color: "#D32F2F",
                          fontSize: 10,
                          height: 20,
                          fontWeight: 700,
                          mb: 1
                        }}
                      />
                    )}
                  </Box>
                  
                  <Box sx={{ 
                    textAlign: "right",
                    minWidth: 150
                  }}>
                    <Typography sx={{ 
                      color: "primary.main", 
                      fontWeight: 700, 
                      fontSize: { xs: 20, md: 22 },
                      lineHeight: 1.2 
                    }}>
                      {property.price}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12 }}>
                      {property.deposit}
                    </Typography>
                  </Box>
                </Box>

                {/* Property Details Grid - SIMPLIFIED like screenshot */}
                <Grid container spacing={2} sx={{ mb: 2, flex: 1 }}>
                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: 12 }}>
                      Area
                    </Typography>
                    <Typography sx={{ fontWeight: 700, mt: 0.5, fontSize: "0.95rem" }}>
                      {property.area}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                      {property.areaType}
                    </Typography>
                  </Grid>

                  <Grid item xs={6} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: 12 }}>
                      Configuration
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1.5, mt: 0.5 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <BedIcon sx={{ opacity: 0.7, fontSize: 16 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                          {property.bhk}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <BathtubIcon sx={{ opacity: 0.7, fontSize: 16 }} />
                        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem" }}>
                          {property.baths}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: 12 }}>
                      Nearby
                    </Typography>
                    {property.nearby.slice(0, 2).map((n, i) => (
                      <Typography key={i} sx={{ 
                        fontSize: 12, 
                        mt: i === 0 ? 0.5 : 0.25,
                        lineHeight: 1.2 
                      }}>
                        {n}
                      </Typography>
                    ))}
                  </Grid>
                </Grid>

                {/* Description - Always visible */}
                <Typography sx={{ 
                  color: "text.secondary",
                  mb: 2,
                  lineHeight: 1.4,
                  fontSize: "0.9rem",
                }}>
                  {property.description}
                </Typography>

                {/* Bottom section with contact info - UPDATED */}
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between", 
                  alignItems: { xs: "flex-start", sm: "center" },
                  pt: 2, 
                  borderTop: "1px solid #eee",
                  mt: "auto",
                  gap: { xs: 1.5, sm: 2 }
                }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ fontSize: 11 }}>
                      Posted
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                      <Typography sx={{ fontWeight: 700, fontSize: "0.9rem" }}>
                        {property.posted}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ fontSize: 11 }}>
                        {property.postedBy}
                      </Typography>
                    </Box>
                    
                    {/* Contact count - NEW */}
                    {property.id === 1 && (
                      <Typography variant="caption" color="text.secondary" sx={{ 
                        fontSize: 10,
                        display: "block",
                        mt: 0.5
                      }}>
                        5 people already contacted since last week
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ 
                    display: "flex", 
                    gap: 1,
                    alignItems: "center"
                  }}>
                    <Button 
                      variant="outlined" 
                      size="medium"
                      sx={{ 
                        minWidth: { xs: "100%", sm: 140 },
                        height: 38,
                        fontSize: 14,
                        borderRadius: 1.5,
                        fontWeight: 600
                      }}
                    >
                      View Number
                    </Button>
                    <Button 
                      variant="contained" 
                      size="medium"
                      sx={{ 
                        minWidth: { xs: "100%", sm: 140 },
                        height: 38,
                        fontSize: 14,
                        borderRadius: 1.5,
                        fontWeight: 600
                      }}
                    >
                      Contact
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };

  // ---------------------------------------------------
  // Main render
  // ---------------------------------------------------
  return (
    <Box sx={{bgcolor: "#f6f7f9" }}>
      {/* Add Gallery Dialog */}
      <GalleryDialog />
      
    

      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Grid container spacing={isMobile ? 0 : 3}>
          {/* left filters */}
          {showFilters && (
            <Grid item xs={12} md={4} lg={3} sx={{ 
              position: isMobile ? "fixed" : "static",
              top: isMobile ? 0 : "auto",
              left: isMobile ? 0 : "auto",
              right: isMobile ? 0 : "auto",
              bottom: isMobile ? 0 : "auto",
              zIndex: isMobile ? 1000 : "auto",
              bgcolor: isMobile ? "rgba(0,0,0,0.5)" : "transparent",
              p: isMobile ? 2 : 0,
              display: "flex",
              alignItems: isMobile ? "center" : "stretch",
              justifyContent: isMobile ? "center" : "flex-start"
            }}>
              <Box sx={{ 
                width: isMobile ? "90%" : "100%",
                maxWidth: isMobile ? 400 : "none"
              }}>
                <FiltersPanel />
                {isMobile && (
                  <Button 
                    fullWidth 
                    variant="contained" 
                    sx={{ mt: 2 }}
                    onClick={() => setShowFilters(false)}
                  >
                    Close Filters
                  </Button>
                )}
              </Box>
            </Grid>
          )}

          {/* main content */}
          <Grid item xs={12} md={showFilters ? 8 : 12} lg={showFilters ? 9 : 12}>
            <Box sx={{ mb: 1.5 }}>
              <Card sx={{ 
                p: { xs: 1.5, sm: 1.5 }, 
                borderRadius: 2, 
                mb: 3,
                width: "100%"
              }}>
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between", 
                  alignItems: { xs: "flex-start", sm: "center" },
                  gap: { xs: 1.5, sm: 2 }
                }}>
                  <Box sx={{ width: "100%" }}>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      mb: 0.5,
                      fontSize: { xs: "1.1rem", sm: "1.3rem" }
                    }}>
                      9,954 results | Property for Rent in Hyderabad
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontSize: "0.85rem" }}>
                      Get to know more about Hyderabad — 
                      <Typography 
                        component="span" 
                        color="primary" 
                        sx={{ 
                          ml: 0.5, 
                          fontWeight: 600,
                          fontSize: "0.85rem",
                          cursor: "pointer" 
                        }}
                      >
                        View Insights ↗
                      </Typography>
                    </Typography>
                  </Box>

                  <Box sx={{ 
                    display: "flex", 
                    gap: 1, 
                    alignItems: "center",
                    width: { xs: "100%", sm: "auto" }
                  }}>
                    <Button 
                      variant="outlined" 
                      size="small"
                      sx={{ 
                        minWidth: 100,
                        height: 34,
                        fontSize: 13,
                        borderRadius: 1 
                      }}
                    >
                      Sort By
                    </Button>
                  </Box>
                </Box>

                {/* Filter chips - UPDATED to match screenshot */}
                <Box sx={{ 
                  display: "flex", 
                  gap: 0.75, 
                  mt: 2, 
                  flexWrap: "wrap",
                  alignItems: "center"
                }}>
                  <Typography variant="caption" color="text.secondary" sx={{ mr: 1, fontSize: 12 }}>
                    Filter by:
                  </Typography>
                  {["Owner", "Verified", "Furnished", "With Photos", "With Videos"].map((label) => (
                    <Chip
                      key={label}
                      label={label}
                      size="small"
                      sx={{ 
                        fontSize: 12,
                        height: 28,
                        borderRadius: 1,
                        '& .MuiChip-label': {
                          px: 1,
                        }
                      }}
                    />
                  ))}
                </Box>
              </Card>
            </Box>

            <Stack spacing={isMobile ? 2 : 2.5} sx={{ width: "100%" }}>
              {properties.map((p) => (
                <Box key={p.id} sx={{ width: "100%" }}>
                  <PropertyCard property={p} />
                </Box>
              ))}
            </Stack>

            {/* Explore Hyderabad */}
            <Box sx={{ mt: 4 }}>
              <Card sx={{ 
                p: { xs: 2, sm: 3 }, 
                borderRadius: 2,
                width: "100%"
              }}>
                <Box sx={{ 
                  display: "flex", 
                  flexDirection: { xs: "column", sm: "row" },
                  justifyContent: "space-between", 
                  alignItems: { xs: "flex-start", sm: "center" }, 
                  mb: 2.5,
                  gap: 1
                }}>
                  <Typography sx={{ 
                    fontWeight: 700, 
                    fontSize: { xs: "1rem", sm: "1.1rem" }
                  }}>
                    Explore Hyderabad
                  </Typography>
                  <Box sx={{ 
                    display: "flex", 
                    gap: 0.5, 
                    alignItems: "center", 
                    color: "text.secondary",
                    fontSize: "0.85rem" 
                  }}>
                    <Typography sx={{ fontSize: "0.85rem" }}>
                      Showing for Rent — Apartments
                    </Typography>
                    <ExpandMoreIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>

                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontSize: "0.95rem" 
                    }}>
                      Popular localities
                    </Typography>
                    <Typography color="text.secondary" sx={{ 
                      mb: 2, 
                      fontSize: "0.85rem" 
                    }}>
                      Most searched by tenants in Hyderabad
                    </Typography>
                    <Stack spacing={1.5}>
                      {popularLocalities.map((l, i) => (
                        <Box 
                          key={i} 
                          sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            p: 1.5, 
                            borderRadius: 1, 
                            border: "1px solid #eee",
                            bgcolor: "#fafbfc"
                          }}
                        >
                          <Box>
                            <Typography sx={{ 
                              fontWeight: 700, 
                              fontSize: "0.9rem" 
                            }}>
                              {l.name}
                            </Typography>
                            <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                              {l.price}
                            </Typography>
                            {l.searches && (
                              <Typography color="success.main" sx={{ fontSize: "0.8rem" }}>
                                {l.searches}
                              </Typography>
                            )}
                          </Box>
                          <Button 
                            variant="text" 
                            color="primary"
                            sx={{ 
                              fontSize: 12,
                              fontWeight: 500,
                              minWidth: 0,
                              p: 0 
                            }}
                          >
                            View ↗
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography sx={{ 
                      fontWeight: 700, 
                      mb: 1,
                      fontSize: "0.95rem" 
                    }}>
                      Top rated localities
                    </Typography>
                    <Typography color="text.secondary" sx={{ 
                      mb: 2, 
                      fontSize: "0.85rem" 
                    }}>
                      based on actual resident reviews
                    </Typography>
                    <Stack spacing={1.5}>
                      {topRatedLocalities.map((l, i) => (
                        <Box 
                          key={i} 
                          sx={{ 
                            display: "flex", 
                            justifyContent: "space-between", 
                            alignItems: "center", 
                            p: 1.5, 
                            borderRadius: 1, 
                            border: "1px solid #eee",
                            bgcolor: "#fafbfc"
                          }}
                        >
                          <Box>
                            <Typography sx={{ 
                              fontWeight: 700, 
                              fontSize: "0.9rem" 
                            }}>
                              {l.name}
                            </Typography>
                            {l.price && (
                              <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                {l.price}
                              </Typography>
                            )}
                            {l.reviews && (
                              <Typography color="text.secondary" sx={{ fontSize: "0.8rem" }}>
                                {l.reviews}
                              </Typography>
                            )}
                          </Box>
                          <Button 
                            variant="text" 
                            color="primary"
                            sx={{ 
                              fontSize: 12,
                              fontWeight: 500,
                              minWidth: 0,
                              p: 0 
                            }}
                          >
                            View ↗
                          </Button>
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>

                <Box sx={{ 
                  mt: 3, 
                  borderTop: "1px solid #eee", 
                  pt: 2 
                }}>
                  <Button 
                    fullWidth 
                    variant="outlined"
                    sx={{ 
                      height: 40,
                      fontSize: 13,
                      borderRadius: 1 
                    }}
                  >
                    View 988 localities
                  </Button>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default UiProps;