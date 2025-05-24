import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: `'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif`,
    fontSize: 16, // Base font size
    p: {
        fontSize: '1rem', // Applies to <p> tags globally
      },
    h3: {
      fontSize: '1.8rem', // 28.8px
    },
    h5: {
      fontSize: '1.22rem', // 19.5px
    },
    body1: {
      fontSize: '1rem', // 16px
      color: '#212529',   // Paragraphs default to body1
    },
    body2: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none',
    },
  },

//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         p: {
//           color: '#212529', // Applies to <p> tags globally
//         },
//       },
//     },
//   },
});

export default theme;
