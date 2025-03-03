// import React from 'react';
// import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
// import { Line, Pie } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import Header from '../../../Shared/Navbar/Navbar';

// // Register required ChartJS components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   LineElement,
//   PointElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   // Data and options for the line chart (Price Trend)
//   const priceData = {
//     labels: ['2023-01', '2023-02', '2023-03', '2023-04'],
//     datasets: [
//       {
//         label: 'Price Trend',
//         data: [200000, 210000, 220000, 240000],
//         borderColor: '#ffa500',
//         backgroundColor: 'rgba(255, 165, 0, 0.1)',
//         fill: true,
//         tension: 0.4,
//       },
//     ],
//   };

//   const priceOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//     scales: {
//       y: {
//         beginAtZero: false,
//       },
//     },
//   };

//   // Data and options for the pie chart (Distribution)
//   const distributionData = {
//     labels: ['Apartments', 'Villas', 'Commercial Spaces'],
//     datasets: [
//       {
//         data: [45, 30, 25],
//         backgroundColor: ['#0066cc', '#ffa500', '#00cc88'],
//       },
//     ],
//   };

//   const distributionOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: 'top',
//       },
//     },
//   };

//   return (
//     <>
//     <Header/>
//     <Box
//       sx={{
//         backgroundImage:
//           "url('https://img.freepik.com/free-photo/contemporary-building-blur_23-2147694747.jpg')",
//         minHeight: '100vh',
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         p: 2,
//       }}
//     >
//       <Container>
//         {/* Page Title */}
//         <Typography
//           variant="h4"
//           sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 4, pl: 2, textAlign:"center" }}
//         >
//           Admin Dashboard
//         </Typography>

//         {/* Stats Cards */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                   Total Portfolio Value
//                 </Typography>
//                 <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
//                   4.5 Cr
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                   Total Performance
//                 </Typography>
//                 <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
//                   22.30%
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Typography sx={{ fontSize: '14px', color: '#666' }}>No of Assets</Typography>
//                 <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
//                   2
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Typography sx={{ fontSize: '14px', color: '#666' }}>
//                   Total amount Invested
//                 </Typography>
//                 <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
//                   10.5L
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//           <Grid item xs={12} sm={6} md={4}>
//             <Card
//               sx={{
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 transition: 'transform 0.3s',
//                 '&:hover': { transform: 'translateY(-5px)' },
//               }}
//             >
//               <CardContent>
//                 <Typography sx={{ fontSize: '14px', color: '#666' }}>Total Interest</Typography>
//                 <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
//                   10%
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>

//         {/* Analytics Section */}
//         <Typography
//           variant="h5"
//           sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 3, pl: 2 }}
//         >
//           Analytics
//         </Typography>

//         <Grid container spacing={3}>
//           {/* Line Chart Card */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 background: 'white',
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 mb: 4,
//               }}
//             >
//               <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
//                 Luxury apartment (ABC) Performance
//               </Typography>
//               <Box sx={{ height: 300 }}>
//                 <Line data={priceData} options={priceOptions} />
//               </Box>
//             </Box>
//           </Grid>

//           {/* Pie Chart Card */}
//           <Grid item xs={12} md={6}>
//             <Box
//               sx={{
//                 background: 'white',
//                 borderRadius: '10px',
//                 p: 2,
//                 boxShadow: 3,
//                 mb: 4,
//               }}
//             >
//               <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
//                 Commercial Space (ABC) Performance
//               </Typography>
//               <Box sx={{ height: 300 }}>
//                 <Pie data={distributionData} options={distributionOptions} />
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>
//       </Container>
//     </Box>
//     </>
//   );
// }

// export default Dashboard;





import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import Header from '../../../Shared/Navbar/Navbar';

// Register required ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  // Data and options for the line chart (Price Trend)
  const priceData = {
    labels: ['2023-01', '2023-02', '2023-03', '2023-04'],
    datasets: [
      {
        label: 'Price Trend',
        data: [200000, 210000, 220000, 240000],
        borderColor: '#ffa500',
        backgroundColor: 'rgba(255, 165, 0, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const priceOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  // Data and options for the pie chart (Distribution)
  const distributionData = {
    labels: ['Apartments', 'Villas', 'Commercial Spaces'],
    datasets: [
      {
        data: [45, 30, 25],
        backgroundColor: ['#0066cc', '#ffa500', '#00cc88'],
      },
    ],
  };

  const distributionOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <>
    <Header/>
    <Box
      sx={{
        backgroundImage:
          "url('https://img.freepik.com/free-photo/contemporary-building-blur_23-2147694747.jpg')",
        minHeight: '100vh',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container>
        {/* Page Title */}
        <Typography
          variant="h4"
          sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 4, pl: 2, textAlign:"center" }}
        >
          Admin Dashboard
        </Typography>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  Total Portfolio Value
                </Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  4.5 Cr
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  Total Performance
                </Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  22.30%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: '14px', color: '#666' }}>No of Assets</Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  2
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: '14px', color: '#666' }}>
                  Total amount Invested
                </Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  10.5L
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <CardContent>
                <Typography sx={{ fontSize: '14px', color: '#666' }}>Total Interest</Typography>
                <Typography sx={{ fontSize: '24px', fontWeight: 'bold', color: '#ff6b6b' }}>
                  10%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Analytics Section */}
        <Typography
          variant="h5"
          sx={{ color: '#100f0f', fontSize: '28px', fontWeight: 700, mb: 3, pl: 2 }}
        >
          Analytics
        </Typography>

        <Grid container spacing={3}>
          {/* Line Chart Card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'white',
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                mb: 4,
              }}
            >
              <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
                Luxury apartment (ABC) Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <Line data={priceData} options={priceOptions} />
              </Box>
            </Box>
          </Grid>

          {/* Pie Chart Card */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'white',
                borderRadius: '10px',
                p: 2,
                boxShadow: 3,
                mb: 4,
              }}
            >
              <Typography sx={{ fontSize: '16px', color: '#666', mb: 2 }}>
                Commercial Space (ABC) Performance
              </Typography>
              <Box sx={{ height: 300 }}>
                <Pie data={distributionData} options={distributionOptions} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
    </>
  );
}

export default Dashboard;


