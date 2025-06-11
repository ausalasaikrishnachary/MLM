import React from 'react';
import { Button, TextField, Grid, Container, Typography } from '@mui/material';
import './Properties.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';


const Properties = () => {
  const navigate = useNavigate();

  return (
    <Container className="properties">
      <div className="filters-container">
        <TextField
          className="search-bar"
          label="Search properties here..."
          variant="outlined"
        />

        <div className="buttons-container">
          <Button className="sort-button" sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>
            Sort by: Latest
          </Button>
          <Button sx={{ color: "#2E166D", border: "1px solid #2E166D" }}>Filters</Button>
        </div>
      </div>

      <Typography variant="h4" className="mt-3" gutterBottom>
        Properties:
      </Typography>
      <Grid container spacing={3}>
        {[
          {
            title: "LARGE WAREHOUSE",
            address: "Industrial Area, Hyderabad, Telangana.",
            yield: "8.5%", value: "₹60,00,00,000", irr: "12.8%",
            image: "https://media.istockphoto.com/id/1405246054/photo/empty-warehouse-in-logistic-center.jpg?s=612x612&w=0&k=20&c=G2GPj8tAeTs71u3hHD9qze_8F41KsoTpopbW94CcRYs="
          },
          {
            title: "The Executive Quarters",
            address: "Sector 15, Bangalore, Karnataka.",
            yield: "9.0%", value: "₹75,00,00,000", irr: "14.2%",
            image: "https://777properties.com/wp-content/uploads/2023/11/pexels-pixabay-269077-jpg.webp"
          },
          {
            title: "LOGISTICS HUB",
            address: "Near National Highway, Mumbai, Maharashtra.",
            yield: "8.8%", value: "₹50,00,00,000", irr: "13.0%",
            image: "https://media.biltrax.com/wp-content/uploads/2023/12/News-Article-Cover-Images-28-1.png"
          },
          {
            title: "DATA CENTER",
            address: "IT Hub, Pune, Maharashtra.",
            yield: "9.2%", value: "₹60,00,00,000", irr: "14.0%",
            image: "https://eu-images.contentstack.com/v3/assets/blt8eb3cdfc1fce5194/blt29d49d9dc2394b9c/66210a507963b40fc4ceec07/google_20data_20center_20cooling_20pipes.jpg?width=1280&auto=webp&quality=95&format=jpg&disable=upscale"
          },
          {
            title: "Office Space",
            address: "Industrial Zone, Chennai, Tamil Nadu.",
            yield: "9.2%", value: "₹65,00,00,000", irr: "14.0%",
            image: "https://propertyingurugram.in/wp-content/uploads/2022/12/Startup-Investment-in-Office-Spaces-A-Good-Sign-for-Commercial-Real-Estate.jpg"
          },
          {
            title: "COLD STORAGE FACILITY",
            address: "Refrigeration Park, Ahmedabad, Gujarat.",
            yield: "8.3%", value: "₹48,00,00,000", irr: "12.5%",
            image: "https://mecaluxcom.cdnwm.com/documents/d/global/m41p03-almacenamiento-frio-estanterias?e=jpg&imwidth=1024&imdensity=1"
          },
          {
            title: "Capital Hub",
            address: "Eco Industrial Zone, Kolkata, West Bengal.",
            yield: "8.0%", value: "₹42,00,00,000", irr: "13.2%",
            image: "https://www.shutterstock.com/image-photo/majestic-industrial-commercial-office-building-600nw-2479144653.jpg"
          },
          {
            title: "TEXTILE MANUFACTURING",
            address: "Industrial Estate, Surat, Gujarat.",
            yield: "8.9%", value: "₹58,00,00,000", irr: "13.8%",
            image: "https://media.istockphoto.com/id/178631224/photo/multi-colored-yarns-in-the-textile-machine.jpg?s=612x612&w=0&k=20&c=toug9tSwN8sZyX76vomTUyAUt7IxemUIsps0n_ip3i0="
          },
          {
            title: "Infinity Square",
            address: "Techno Park, Noida, Uttar Pradesh.",
            yield: "9.1%", value: "₹70,00,00,000", irr: "14.5%",
            image: "https://i1.au.reastatic.net/712x480,smart=85,r=33,g=40,b=46,quality=60,progressive/8a8a0000f60807744f7154a903cf55d9bbb58507ba6b99134dcdd648a794e7c6/image0.jpg"
          }
        ].map((property, index) => (
          <Grid item md={4} xs={12} key={index}>
            <div className="property-card">
              <img
                src={property.image}
                alt={property.title}
                className="property-img"
              />
              <div className="property-description">
                <div className="property-title">{property.title}</div>
                <p>Address: {property.address}</p>
                <p>
                  Gross Entry Yield: {property.yield} | Asset Value: {property.value} | Target IRR: {property.irr}
                </p>
              </div>
              <div className="btn-container single-button">
                <Button
                  sx={{ color: "#2E166D", border: "1px solid #2E166D", width: "100%" }}
                  onClick={() => navigate('/propertydetails')}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Properties;
