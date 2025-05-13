import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  Box,
  Fade,
  Grow,
  TextField,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Edit as EditIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import AdminDashboard from "../../Admin/Dashboard/Dashboard";
import Packages2 from "./Packages2";
import Packages3 from "./Packages3";

const ConstructionPackages = () => {
  const [expanded, setExpanded] = useState({});
  const [editableContent, setEditableContent] = useState({});
  const [editingField, setEditingField] = useState(null);
  const [tempContent, setTempContent] = useState({});
  const [packageData, setPackageData] = useState({
    package_cost: 0,
    tile_general: 0,
    tile_stair: 0,
    tile_balcony: 0,
    title_bathroom: 0,
    tile_parking: 0,
    tile_kitchen_countertop: 0,
    tile_kitchen_backsplash: 0,
    window_standered: 0,
    doors_main: 0,
    doors_pooja: 0,
    doors_internal: 0,
    fabrication_stair_rail: 0,
    fabrication_gate: 0,
    sanitary_overheadtank: 0,
    sanitary_commode: 0,
    sanitary_wallmixer: 0,
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [editingPackageCost, setEditingPackageCost] = useState(false);
  const [tempPackageCost, setTempPackageCost] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [sectionContent, setSectionContent] = useState({
    package2500: {
      design:
        "• <strong>2D Floor Plans</strong> \n• <strong>3D Elevations</strong>",
      materials:
        "• <strong>Steel:</strong> Fe500/550 Grade TMT (A-One Gold, Prime Gold, or Equivalent)\n• <strong>Cement:</strong> 53 & 43 Grade (Bharathi, Dalmia, Maha, or Equivalent)\n• <strong>Aggregates:</strong> 20mm & 40mm\n• <strong>Sand:</strong> M-Sand for blockwork, P-Sand for plastering\n• <strong>Blocks:</strong> Solid Blocks (6″ {36 per pic} & 4″ {28 per pic})\n• <strong>Concrete Mix:</strong> RMC or hand mix – M20 Grade\n• <strong>Underground Sump:</strong> 6″ solid block with waterproof plastering\n• <strong>Plinth Foundation:</strong> One course of size stone masonry\n• <strong>Ceiling Height:</strong> 10 feet (floor to floor)\n• <strong>Waterproofing:</strong> Dr. Fixit or Fosroc",
      flooring:
        "• <strong>Living, Kitchen, Dining & Bedroom:</strong> Tiles up to ₹60/sq. ft.\n• <strong>Staircase:</strong> Granite up to ₹80/sq. ft.\n• <strong>Balconies & Sitouts:</strong> Anti-skid tiles up to ₹60/sq. ft.\n• <strong>Bathrooms/Toilets:</strong> Wall & floor tiles up to ₹60/sq. ft.\n• <strong>Parking Area:</strong> Flooring up to ₹50/sq. ft.\n• <strong>Kitchen Countertop:</strong> Granite up to ₹100/sq. ft.\n• <strong>Kitchen Backsplash (Dadoing, 4ft height):</strong> Tiles up to ₹50/sq. ft.\n• <strong>Bathroom Wall Tiling:</strong> Up to 7 feet height\n• <strong>Terrace Finishing:</strong> Screed concrete",
      windows:
        "• <strong>Standard Windows:</strong> 2-track UPVC with 5mm glass & MS grill (₹550/sq. ft.)\n• <strong>Maximum Window Openings:</strong> 2.5-track Aluminum with 4mm glass & MS grill\n• <strong>Maximum Window Coverage:</strong> 10% of total wall space",
      doors:
        "• <strong>Main Door:</strong> Teakwood frame (5″x3″) with teak shutter & fittings (₹22,000 per door)\n• <strong>Pooja Room Door:</strong> Frame (5″x3″) with readymade shutter & fittings (₹20,000 per door)\n• <strong>Internal Doors:</strong> WPC or neem wood frame (4″x3″) with membrane shutter & fittings (₹8,000 per door)\n• <strong>Bathroom Doors:</strong> PVC/WPC doors",
      painting:
        "• <strong>Interior Walls & Ceilings:</strong> 2 coats putty + 1 coat primer + 2 coats of Asian Tractor Emulsion\n• <strong>Exterior Walls:</strong> 1 coat primer + 2 coats of ACE Emulsion\n• <strong>Windows & MS Grills:</strong> 2 coats of enamel paint\n• <strong>Paint Brands:</strong> Asian, Berger, Dulux (as per owner preference)",
      fabrication:
        "• <strong>MS Staircase Railing:</strong> ₹300 per sq. ft. (3′ height)\n• <strong>MS Standard Gate:</strong> ₹350 per sq. ft. (5′ height)",
      plumbing:
        "• <strong>Pipes:</strong> CPVC (Ashirwad, Supreme, Astral)\n• <strong>Overhead Tank:</strong> PVC (Ganga or Kaveri) with MS support (6ft height)\n• <strong>Solar & Geyser Provision:</strong> Diverter and mixer-ready\n• <strong>Sanitary Installations:</strong>\n o <strong>Overhead tank:</strong> ₹1,000\n o <strong>Commode:</strong> ₹6,500\n o <strong>Wall mixer:</strong> ₹3,500",
      extra:
        "• <strong>Compound Wall Construction</strong>\n• <strong>BBMP/BDA Approvals & Liaison Fees</strong>\n• <strong>Building Plinth Level Above 18″ from Road</strong>\n• <strong>External Ramps & Landscaping, road cutting works</strong>\n• <strong>Extra Depth for Sump Tank, Rain water sump</strong>\n• <strong>Interior Works (Wardrobes, False Ceiling, etc.)</strong>\n• <strong>External Elevation Cladding</strong>\n• <strong>Security Fabrication Works</strong>\n• <strong>Any Civil Works Outside the Main House</strong>\n• <strong>Additional Height for Compound Wall</strong>\n• <strong>Electrical Fixtures (Lights, Fans, Bulbs, etc.)</strong>\n• <strong>Additional Charges for Soil Bearing Capacity < 180 SBC</strong>",
      sanctions:
        "Assistance with approvals from government agencies, including:\n• <strong>Construction Plan Sanction</strong>\n• <strong>Temporary Electricity Connection</strong>\n• <strong>Permanent Electrical Connection</strong>\n• <strong>Water Connection</strong>\n• <strong>Sewage Connection</strong>",
      elevation:
        "<strong>Elevation Budget:</strong> 0.25% of the Project's Super Built-Up Cost",
      audit:
        "• <strong>Soil Testing:</strong> Additional charges\n• <strong>Site Supervision:</strong> Civil Engineer & Project Manager assigned\n• <strong>Architect Visits:</strong> Additional charges",
    },
  });

  // Fetch data from API
  const fetchPackageData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("https://landnest.net:81/packages/2/");
      setPackageData(response.data);
      updateSectionContent(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching package data:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch package data",
        severity: "error",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  const updateSectionContent = (data) => {
    const updatedSectionContent = {
      package2500: {
        ...sectionContent.package2500,
        flooring: `• <strong>Living, Kitchen, Dining & Bedroom:</strong> Tiles up to ₹${
          data.tile_general || 0
        }/sq. ft.
• <strong>Staircase:</strong> Granite up to ₹${data.tile_stair || 0}/sq. ft.
• <strong>Balconies & Sitouts:</strong> Anti-skid tiles up to ₹${
          data.tile_balcony || 0
        }/sq. ft.
• <strong>Bathrooms/Toilets:</strong> Wall & floor tiles up to ₹${
          data.title_bathroom || 0
        }/sq. ft.
• <strong>Parking Area:</strong> Flooring up to ₹${
          data.tile_parking || 0
        }/sq. ft.
• <strong>Kitchen Countertop:</strong> Granite up to ₹${
          data.tile_kitchen_countertop || 0
        }/sq. ft.
• <strong>Kitchen Backsplash (Dadoing, 4ft height):</strong> Tiles up to ₹${
          data.tile_kitchen_backsplash || 0
        }/sq. ft.
• <strong>Bathroom Wall Tiling:</strong> Up to 7 feet height
• <strong>Terrace Finishing:</strong> Screed concrete`,
        windows: `• <strong>Standard Windows:</strong> 2-track UPVC with 5mm glass & MS grill (₹${
          data.window_standered || 0
        }/sq. ft.)
• <strong>Maximum Window Openings:</strong> 2.5-track Aluminum with 4mm glass & MS grill
• <strong>Maximum Window Coverage:</strong> 10% of total wall space`,
        doors: `• <strong>Main Door:</strong> Teakwood frame (5″x3″) with teak shutter & fittings (₹${
          data.doors_main || 0
        } per door)
• <strong>Pooja Room Door:</strong> Frame (5″x3″) with readymade shutter & fittings (₹${
          data.doors_pooja || 0
        } per door)
• <strong>Internal Doors:</strong> WPC or neem wood frame (4″x3″) with membrane shutter & fittings (₹${
          data.doors_internal || 0
        } per door)
• <strong>Bathroom Doors:</strong> PVC/WPC doors`,
        fabrication: `• <strong>MS Staircase Railing:</strong> ₹${
          data.fabrication_stair_rail || 0
        } per sq. ft. (3′ height)
• <strong>MS Standard Gate:</strong> ₹${
          data.fabrication_gate || 0
        } per sq. ft. (5′ height)`,
        plumbing: `• <strong>Pipes:</strong> CPVC (Ashirwad, Supreme, Astral)
• <strong>Overhead Tank:</strong> PVC (Ganga or Kaveri) with MS support (6ft height)
• <strong>Solar & Geyser Provision:</strong> Diverter and mixer-ready
• <strong>Sanitary Installations:</strong>
 o <strong>Overhead tank:</strong> ₹${data.sanitary_overheadtank || 0}
 o <strong>Commode:</strong> ₹${data.sanitary_commode || 0}
 o <strong>Wall mixer:</strong> ₹${data.sanitary_wallmixer || 0}`,
      },
    };
    setSectionContent(updatedSectionContent);
  };

  const handleChange = (panel, packageType) => (event, newExpanded) => {
    setExpanded((prev) => ({
      ...prev,
      [packageType]: newExpanded ? panel : null,
    }));
  };

  const extractRupeeValues = (content) => {
    const rupeeRegex = /₹(\d{1,3}(?:,\d{3})*(?:\.\d{2})?|\d+|null)/g;
    const matches = [...content.matchAll(rupeeRegex)];
    return matches.map((match) => ({
      value: match[0],
      index: match.index,
      length: match[0].length,
    }));
  };

  const handleEdit = (pkgId, sectionId, content) => {
    setTempContent((prev) => ({
      ...prev,
      [`${pkgId}-${sectionId}`]: content,
    }));
    setEditingField(`${pkgId}-${sectionId}`);
  };

  const handleSave = async (pkgId, sectionId) => {
    try {
      const content =
        tempContent[`${pkgId}-${sectionId}`] ||
        sectionContent.package2500[
          sectionId.replace("pkg2500", "").toLowerCase()
        ];
      const rupeeValues = extractRupeeValues(content);

      if (rupeeValues.length === 0) {
        setEditableContent((prev) => ({
          ...prev,
          [`${pkgId}-${sectionId}`]: content,
        }));
        setEditingField(null);
        return;
      }

      let updatePayload = {};
      const sectionKey = sectionId.replace("pkg2500", "").toLowerCase();

      switch (sectionKey) {
        case "three": // Flooring section
          const flooringValues = content.match(/₹(\d+)/g) || [];
          updatePayload = {
            tile_general: extractNumber(flooringValues[0]),
            tile_stair: extractNumber(flooringValues[1]),
            tile_balcony: extractNumber(flooringValues[2]),
            title_bathroom: extractNumber(flooringValues[3]),
            tile_parking: extractNumber(flooringValues[4]),
            tile_kitchen_countertop: extractNumber(flooringValues[5]),
            tile_kitchen_backsplash: extractNumber(flooringValues[6]),
          };
          break;
        case "four": // Windows section
          const windowValue = content.match(/₹(\d+)/);
          updatePayload = {
            window_standered: windowValue ? extractNumber(windowValue[0]) : 0,
          };
          break;
        case "five": // Doors section
          const doorValues = content.match(/₹(\d+)/g) || [];
          updatePayload = {
            doors_main: extractNumber(doorValues[0]),
            doors_pooja: extractNumber(doorValues[1]),
            doors_internal: extractNumber(doorValues[2]),
          };
          break;
        case "seven": // Fabrication section
          const fabricationValues = content.match(/₹(\d+)/g) || [];
          updatePayload = {
            fabrication_stair_rail: extractNumber(fabricationValues[0]),
            fabrication_gate: extractNumber(fabricationValues[1]),
          };
          break;
        case "eight": // Plumbing section
          const plumbingValues = content.match(/₹(\d+)/g) || [];
          updatePayload = {
            sanitary_overheadtank: extractNumber(plumbingValues[0]) || 0,
            sanitary_commode: extractNumber(plumbingValues[1]) || 0,
            sanitary_wallmixer: extractNumber(plumbingValues[2]) || 0,
          };
          break;
      }

      const filteredPayload = Object.fromEntries(
        Object.entries(updatePayload).filter(([_, v]) => v !== undefined)
      );

      if (Object.keys(filteredPayload).length > 0) {
        await axios.put(`https://landnest.net:81/packages/2/`, filteredPayload);

        // Refresh data after successful update
        await fetchPackageData();

        setSnackbar({
          open: true,
          message: "Package updated successfully",
          severity: "success",
        });
      }

      setEditableContent((prev) => ({
        ...prev,
        [`${pkgId}-${sectionId}`]: content,
      }));
      setEditingField(null);
    } catch (error) {
      console.error("Error updating package:", error);
      setSnackbar({
        open: true,
        message: "Failed to update package",
        severity: "error",
      });
    }
  };

  const extractNumber = (value) => {
    if (!value) return 0;
    const num = value.replace(/[^0-9]/g, "");
    return num ? parseInt(num, 10) : 0;
  };

  const handleEditPackageCost = () => {
    setTempPackageCost(packageData.package_cost?.toString() || "0");
    setEditingPackageCost(true);
  };

  const handleSavePackageCost = async () => {
    try {
      await axios.put(`https://landnest.net:81/packages/2/`, {
        package_cost: parseInt(tempPackageCost) || 0,
      });

      // Refresh data after successful update
      await fetchPackageData();

      setEditingPackageCost(false);
      setSnackbar({
        open: true,
        message: "Package cost updated successfully",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating package cost:", error);
      setSnackbar({
        open: true,
        message: "Failed to update package cost",
        severity: "error",
      });
    }
  };

  const handleRupeeValueChange = (
    pkgId,
    sectionId,
    content,
    index,
    length,
    newValue
  ) => {
    if (!newValue.startsWith("₹")) {
      newValue = "₹" + (newValue.replace(/[^0-9]/g, "") || "0");
    } else {
      newValue = "₹" + (newValue.substring(1).replace(/[^0-9]/g, "") || "0");
    }

    const newContent =
      content.substring(0, index) +
      newValue +
      content.substring(index + length);
    setTempContent((prev) => ({
      ...prev,
      [`${pkgId}-${sectionId}`]: newContent,
    }));
  };

  const renderContentWithEditableRupeeValues = (pkgId, sectionId, content) => {
    if (editingField !== `${pkgId}-${sectionId}`) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }

    const rupeeValues = extractRupeeValues(content);
    if (rupeeValues.length === 0) {
      return <span dangerouslySetInnerHTML={{ __html: content }} />;
    }

    let lastPos = 0;
    const elements = [];

    rupeeValues.forEach((rupee, i) => {
      if (rupee.index > lastPos) {
        elements.push(
          <span
            key={`text-${i}`}
            dangerouslySetInnerHTML={{
              __html: content.substring(lastPos, rupee.index),
            }}
          />
        );
      }

      elements.push(
        <TextField
          key={`edit-${i}`}
          value={rupee.value}
          onChange={(e) =>
            handleRupeeValueChange(
              pkgId,
              sectionId,
              tempContent[`${pkgId}-${sectionId}`],
              rupee.index,
              rupee.length,
              e.target.value
            )
          }
          size="small"
          sx={{
            display: "inline-block",
            width: `${Math.max(rupee.length * 8, 80)}px`,
            mx: 0.5,
            "& .MuiInputBase-root": {
              height: "32px",
            },
          }}
        />
      );

      lastPos = rupee.index + rupee.length;
    });

    if (lastPos < content.length) {
      elements.push(
        <span
          key="text-end"
          dangerouslySetInnerHTML={{
            __html: content.substring(lastPos),
          }}
        />
      );
    }

    return elements;
  };

  const packages = [
    {
      id: "package2500",
      title: "Basic Package Details",
      price: `Rs ${
        packageData.package_cost
          ? (packageData.package_cost / 1000).toFixed(0) + "K"
          : "Loading..."
      }`,
      color: "",
      gradient: "linear-gradient(135deg,rgb(101, 81, 77),rgb(124, 119, 119))",
      sections: [
        {
          id: "pkg2500One",
          title: "Design & Drawings",
          content: sectionContent.package2500.design,
        },
        {
          id: "pkg2500Two",
          title: "Construction Materials",
          content: sectionContent.package2500.materials,
        },
        {
          id: "pkg2500Three",
          title: "Flooring & Wall Tiling",
          content: sectionContent.package2500.flooring,
        },
        {
          id: "pkg2500Four",
          title: "Windows",
          content: sectionContent.package2500.windows,
        },
        {
          id: "pkg2500Five",
          title: "Doors",
          content: sectionContent.package2500.doors,
        },
        {
          id: "pkg2500Six",
          title: "Painting & Finishing",
          content: sectionContent.package2500.painting,
        },
        {
          id: "pkg2500Seven",
          title: "Fabrication Works",
          content: sectionContent.package2500.fabrication,
        },
        {
          id: "pkg2500Eight",
          title: "Plumbing & Sanitary",
          content: sectionContent.package2500.plumbing,
        },
        {
          id: "pkg2500Nine",
          title: "Extra Charges",
          content: sectionContent.package2500.extra,
        },
        {
          id: "pkg2500Ten",
          title: "Government Sanctions & Electrical Assistance",
          content: sectionContent.package2500.sanctions,
        },
        {
          id: "pkg2500Eleven",
          title: "Elevation Budget",
          content: sectionContent.package2500.elevation,
        },
        {
          id: "pkg2500Twelve",
          title: "Site Audit & Reporting",
          content: sectionContent.package2500.audit,
        },
      ],
    },
  ];

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <AdminDashboard />
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            px: { xs: 2, sm: 4, md: 6 },
            pt: 4,
            maxWidth: "800px",
            margin: "0 auto",
            pb: 2,
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: "30px",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          {/* First Card */}
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: "100%", md: "400px" },
              maxWidth: { xs: "100%", md: "500px" },
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "300px",
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              packages.map((pkg, index) => (
                <Grow in={true} timeout={index * 200 + 400} key={pkg.id}>
                  <Card
                    sx={{
                      borderRadius: "16px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                      overflow: "hidden",
                      transition: "transform 0.4s, box-shadow 0.4s",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 15px 35px rgba(0,0,0,0.15)",
                      },
                      border: "none",
                      width: "100%",
                      height: "700px",
                      display: "flex",
                      flexDirection: "column",
                      marginTop:'33px'
                     
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 700,
                            color: "white",
                            fontSize: "1.6rem",
                            letterSpacing: "0.5px",
                          }}
                        >
                          {pkg.title}
                        </Typography>
                      }
                      subheader={
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          {editingPackageCost ? (
                            <TextField
                              value={tempPackageCost}
                              onChange={(e) =>
                                setTempPackageCost(
                                  e.target.value.replace(/\D/g, "")
                                )
                              }
                              size="small"
                              sx={{
                                width: "120px",
                                mr: 1,
                                "& .MuiInputBase-input": {
                                  color: "white",
                                  textAlign: "center",
                                },
                                "& .MuiOutlinedInput-root": {
                                  "& fieldset": {
                                    borderColor: "rgba(255,255,255,0.5)",
                                  },
                                  "&:hover fieldset": {
                                    borderColor: "rgba(255,255,255,0.8)",
                                  },
                                },
                              }}
                            />
                          ) : (
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 700,
                                color: "white",
                                mt: 1.5,
                                background: "rgba(255,255,255,0.2)",
                                display: "inline-block",
                                px: 3,
                                py: 1,
                                borderRadius: "20px",
                                backdropFilter: "blur(5px)",
                                fontSize: "1.5rem",
                              }}
                            >
                              {packageData.package_cost
                                ? `Rs ${(
                                    packageData.package_cost / 1000
                                  ).toFixed(0)}K`
                                : "Loading..."}
                            </Typography>
                          )}
                          <IconButton
                            onClick={
                              editingPackageCost
                                ? handleSavePackageCost
                                : handleEditPackageCost
                            }
                            sx={{ color: "white", ml: 1 }}
                            disabled={isLoading}
                          >
                            {editingPackageCost ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                        </Box>
                      }
                      sx={{
                        background: pkg.gradient,
                        padding: "45px 20px",
                        textAlign: "center",
                        position: "relative",
                        "&:after": {
                          content: '""',
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: "100px",
                          height: "1px",
                          backgroundColor: "rgba(255,255,255,0.5)",
                          borderRadius: "2px",
                        },
                      }}
                    />
                    <Box
                      sx={{
                        background: "#fff",
                        flexGrow: 1,
                        overflowY: "auto",
                        paddingBottom: 2,
                        
                      }}
                    >
                      {pkg.sections.map((section) => (
                        <Accordion
                          key={section.id}
                          expanded={expanded[pkg.id] === section.id}
                          onChange={handleChange(section.id, pkg.id)}
                          sx={{
                            "&:before": { display: "none" },
                            boxShadow: "none",
                            borderBottom: "1px solid rgba(0,0,0,0.05)",
                            backgroundColor:
                              expanded[pkg.id] === section.id
                                ? "rgba(74, 0, 224, 0.03)"
                                : "transparent",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              backgroundColor: "rgba(74, 0, 224, 0.03)",
                            },
                          }}
                        >
                          <AccordionSummary
                            expandIcon={
                              expanded[pkg.id] === section.id ? (
                                <RemoveIcon sx={{ color: pkg.color }} />
                              ) : (
                                <AddIcon sx={{ color: "#666" }} />
                              )
                            }
                            aria-controls={`${section.id}-content`}
                            id={`${section.id}-header`}
                            sx={{
                              padding: "0 25px",
                              minHeight: "68px !important",
                              "& .MuiAccordionSummary-content": {
                                margin: "12px 0",
                                alignItems: "center",
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 600,
                                color:
                                  expanded[pkg.id] === section.id
                                    ? pkg.color
                                    : "#444",
                                fontSize: "1.2rem",
                                letterSpacing: "0.2px",
                              }}
                            >
                              {section.title}
                            </Typography>
                            <IconButton
                              onClick={(e) => {
                                e.stopPropagation();
                                if (
                                  editingField === `${pkg.id}-${section.id}`
                                ) {
                                  handleSave(pkg.id, section.id);
                                } else {
                                  handleEdit(
                                    pkg.id,
                                    section.id,
                                    editableContent[
                                      `${pkg.id}-${section.id}`
                                    ] || section.content
                                  );
                                }
                              }}
                              sx={{ marginLeft: "auto" }}
                              disabled={isLoading}
                            >
                              {editingField === `${pkg.id}-${section.id}` ? (
                                <SaveIcon />
                              ) : (
                                <EditIcon />
                              )}
                            </IconButton>
                          </AccordionSummary>
                          <AccordionDetails
                            sx={{
                              padding: "0 25px 25px",
                              backgroundColor: "#fff",
                              borderLeft: `3px solid ${pkg.color}`,
                              marginLeft: "25px",
                              marginBottom: "15px",
                              borderRadius: "0 8px 8px 0",
                              transition: "all 0.3s ease",
                            }}
                          >
                            <Typography
                              variant="body1"
                              sx={{
                                color: "#555",
                                textAlign: "left",
                                lineHeight: "1.8",
                                fontSize: "0.95rem",
                                whiteSpace: "pre-line",
                              }}
                            >
                              {renderContentWithEditableRupeeValues(
                                pkg.id,
                                section.id,
                                editingField === `${pkg.id}-${section.id}`
                                  ? tempContent[`${pkg.id}-${section.id}`]
                                  : editableContent[
                                      `${pkg.id}-${section.id}`
                                    ] || section.content
                              )}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      ))}
                    </Box>
                  </Card>
                </Grow>
              ))
            )}
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: { xs: "100%", md: "400px" },
              maxWidth: { xs: "100%", md: "500px" },
              height: "700px",
            }}
          >
            <Packages2 />
          </Box>

          <Box
            sx={{
              flex: 1,
              minWidth: { xs: "100%", md: "400px" },
              maxWidth: { xs: "100%", md: "500px" },
              height: "700px",
            }}
          >
            <Packages3 />
          </Box>
        </Box>
      </Fade>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConstructionPackages;

{
  /* Second Card */
}
{
  /* <Box
            sx={{
              flex: 1,
              minWidth: { xs: "100%", md: "400px" },
              maxWidth: { xs: "100%", md: "500px" },
              height: "700px",
            }}
          >
            <Packages2 />
          </Box> */
}
