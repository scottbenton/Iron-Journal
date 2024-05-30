import { Theme, createTheme } from "@mui/material";
import { sunsetTheme } from "./sunsetTheme";
import { hinterlandsTheme } from "./hinterlandsTheme";
import { sharedStatusColors, baseFontFamilies } from "./constants";
import { green } from "@mui/material/colors";
import { starlightTheme } from "./starlightTheme";
import { seaFoamTheme } from "./seaFoamTheme";
import { ThemeConfig, ThemeType, Themes } from "./theme.types";

export const themes: Record<Themes, ThemeConfig> = {
  [Themes.Sunset]: sunsetTheme,
  [Themes.Hinterlands]: hinterlandsTheme,
  [Themes.Starlight]: starlightTheme,
  [Themes.SeaFoam]: seaFoamTheme,
};

export function getTheme(theme: Themes, type: ThemeType): Theme {
  const config = themes[theme];
  return createTheme({
    palette: {
      primary: config.palette.primary,
      secondary: green,
      darkGrey: config.configs[type].darkGrey,
      background: config.configs[type].background,
      divider: config.palette.grey[type === ThemeType.Light ? 300 : 600],
      grey: config.palette.grey,
      ...sharedStatusColors,
    },
    typography: {
      fontFamily: ["'Rubik Variable'", ...baseFontFamilies].join(","),
    },
    fontFamilyTitle: ["'Bebas Neue'", ...baseFontFamilies].join(","),
    shape: {
      borderRadius: config.borderRadius,
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
            // border: `1px solid ${
            //   config.palette.grey[type === ThemeType.Light ? 300 : 700]
            // }`,
            backgroundImage: "unset!important", // Remove the annoying elevation background filter
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            "&& .Mui-selected, && .Mui-selected:hover": {
              backgroundColor:
                config.palette.grey[type === ThemeType.Light ? 200 : 700],
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => {
            return {
              "&.Mui-focusVisible": {
                boxShadow: `inset 0 0 0 2px ${theme.palette.info.main}, 0 0 0 2px ${theme.palette.info.main}`,
                "&.dark-focus-outline": {
                  boxShadow: `inset 0 0 0 2px ${theme.palette.info.light}, 0 0 0 2px ${theme.palette.info.light}`,
                },
              },
            };
          },
        },
      },
      MuiButtonBase: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focusVisible": {
              boxShadow: `inset 0 0 0 2px ${theme.palette.info.main}, 0 0 0 2px ${theme.palette.info.main}`,
              "&.dark-focus-outline": {
                boxShadow: `inset 0 0 0 2px ${theme.palette.info.light}, 0 0 0 2px ${theme.palette.info.light}`,
              },
            },
          }),
        },
      },
      ...(config.overrides ?? {}),
    },
  });
}
