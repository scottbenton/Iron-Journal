import { HexboxUnchecked } from "assets/HexboxUnchecked";
import { ThemeConfig, ThemeType } from "./theme.types";
import { StarlightBackground } from "./backgrounds/StarlightBackground";
import { slate, starlight } from "./constants";
import { StarlightEmptyState } from "./emptyStates/StarlightEmptyState";
import { HexboxChecked } from "assets/HexboxChecked";

export const starlightTheme: ThemeConfig = {
  name: "Starlight",
  iconPath: "/theme/starlight.svg",
  emptyStateImage: <StarlightEmptyState />,
  palette: {
    primary: starlight,
    grey: slate,
  },
  borderRadius: 8,
  background: {
    type: "background",
    node: <StarlightBackground />,
  },
  configs: {
    [ThemeType.Light]: {
      darkGrey: {
        light: slate[800],
        main: slate[900],
        dark: slate[950],
        contrastText: "#fff",
      },
      background: {
        paper: "#fff",
        paperInlay: slate[100],
        paperInlayDarker: slate[200],
        default: slate[200],
      },
    },
    [ThemeType.Dark]: {
      darkGrey: {
        light: slate[900],
        main: slate[950],
        dark: "#030712",
        contrastText: "#fff",
      },
      background: {
        paper: slate[900],
        paperInlay: slate[950],
        paperInlayDarker: slate[800],
        default: slate[950],
      },
    },
  },
  overrides: {
    MuiRadio: {
      defaultProps: {
        icon: <HexboxUnchecked />,
        checkedIcon: <HexboxChecked />,
      },
    },
    MuiCheckbox: {
      defaultProps: {
        icon: <HexboxUnchecked />,
        checkedIcon: <HexboxChecked />,
      },
      styleOverrides: {
        root: {
          "&&.Mui-disabled": {
            color: "#bdbdbd",
          },
        },
      },
    },
  },
};
