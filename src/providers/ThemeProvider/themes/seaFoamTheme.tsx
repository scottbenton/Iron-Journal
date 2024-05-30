import { ThemeConfig, ThemeType } from "./theme.types";
import { SeaFoamDivider } from "./backgrounds/SeaFoamDivider";
import { blueGray, seafoam } from "./constants";
import { SeaFoamEmptyState } from "./emptyStates/SeaFoamEmptyState";

export const seaFoamTheme: ThemeConfig = {
  name: "Sea Foam",
  iconPath: "/theme/sea-foam.svg",
  emptyStateImage: <SeaFoamEmptyState />,
  palette: {
    primary: seafoam,
    grey: blueGray,
  },
  borderRadius: 4,
  background: {
    type: "separator",
    node: <SeaFoamDivider />,
  },
  configs: {
    [ThemeType.Light]: {
      darkGrey: {
        light: blueGray[600],
        main: blueGray[700],
        dark: blueGray[800],
        contrastText: "#fff",
      },
      background: {
        paper: "#fff",
        paperInlay: blueGray[100],
        paperInlayDarker: blueGray[200],
        default: blueGray[200],
      },
    },
    [ThemeType.Dark]: {
      darkGrey: {
        light: blueGray[800],
        main: blueGray[900],
        dark: blueGray[950],
        contrastText: "#fff",
      },
      background: {
        paper: blueGray[900],
        paperInlay: blueGray[800],
        paperInlayDarker: blueGray[700],
        default: blueGray[950],
      },
    },
  },
};
