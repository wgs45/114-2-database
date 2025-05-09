import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffffff", // White buttons/text/icons
    },
    background: {
      default: "#0d0d0d", // Near black background
      paper: "#111111", // Slightly lighter for cards, nav, etc.
    },
    text: {
      primary: "#ffffff",
      secondary: "#aaaaaa",
    },
  },
  typography: {
    fontFamily: `"Inter", "SF Pro Display", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    "none",
    "0px 1px 3px rgba(255,255,255,0.05)",
    "0px 4px 8px rgba(255,255,255,0.08)",
    ...Array(23).fill("none"), // Override default shadows
  ],
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d0d0d",
    },
    background: {
      default: "#f5ff5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: `"Inter", "SF Pro Display", sans-serif`,
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 10,
  },
});
