import { createTheme } from "@mui/material/styles";

export const Theme = createTheme({
 palette: {
  mode: "dark",
  action: {
   main: "#3498db",
  },
  background: {
   paper: "#212529",
   default: "#0f0f0f",
  },
 },
 typography: {
  fontFamily: [
   "Poppins",
   "-apple-system",
   "BlinkMacSystemFont",
   '"Segoe UI"',
   '"Helvetica Neue"',
   "Arial",
   "sans-serif",
   '"Apple Color Emoji"',
   '"Segoe UI Emoji"',
   '"Segoe UI Symbol"',
  ].join(","),
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 500,
 },
});
