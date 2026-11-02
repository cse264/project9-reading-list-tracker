import React from 'react';
import ReactDOM from 'react-dom/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import App from './App.jsx';

// TODO (optional): customize the theme – colors, fonts, shape, etc.
// https://mui.com/material-ui/customization/theming/
const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* LocalizationProvider is required for the MUI DatePicker */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <App />
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode>
);
