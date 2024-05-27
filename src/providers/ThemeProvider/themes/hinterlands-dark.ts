import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import { hinterlandsGreen, ironswornGrey } from "./constants-ironsworn";
import { baseFontFamilies, sharedStatusColors } from "./constants-shared";

export const hinterlandsDarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: hinterlandsGreen,
    secondary: green,
    darkGrey: {
      light: ironswornGrey[800],
      main: ironswornGrey[900],
      dark: "#09090b",
      contrastText: "#fff",
    },
    ...sharedStatusColors,
    background: {
      paper: ironswornGrey[900],
      paperInlay: ironswornGrey[800],
      paperInlayDarker: ironswornGrey[700],
      default: "#09090b",
    },
    grey: ironswornGrey,
  },
  typography: {
    fontFamily: ["'Rubik Variable'", ...baseFontFamilies].join(","),
  },
  fontFamilyTitle: ["'Bebas Neue'", ...baseFontFamilies].join(","),
  shape: {
    borderRadius: 4,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: "unset!important", // Remove the annoying elevation background filter
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid #3f3f46`,
          backgroundImage: "unset!important", // Remove the annoying elevation background filter
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          "&& .Mui-selected, && .Mui-selected:hover": {
            backgroundColor: ironswornGrey[700],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => {
          return {
            "&.Mui-focusVisible": {
              boxShadow: `inset 0 0 0 2px ${theme.palette.info.light}, 0 0 0 2px ${theme.palette.info.light}`,
            },
          };
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: ({ theme }) => ({
          "&.Mui-focusVisible": {
            boxShadow: `inset 0 0 0 2px ${theme.palette.info.light}, 0 0 0 2px ${theme.palette.info.light}`,
          },
        }),
      },
    },
  },
});
