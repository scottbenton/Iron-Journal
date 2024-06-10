import { Box, useMediaQuery, useTheme } from "@mui/material";

export interface ImageBoxHeaderBackgroundProps {
  rounded?: boolean;
}

export function ImageBoxHeaderBackground(props: ImageBoxHeaderBackgroundProps) {
  const { rounded } = props;

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));
  return (
    <Box
      sx={(theme) => ({
        height: theme.spacing(isLg ? 10 : 6),
      })}
    >
      <Box
        sx={(theme) => ({
          borderRadius: rounded ? "100%" : 1,
          position: "relative",
          border: `1px solid ${theme.palette.divider}`,
          top: theme.spacing(2),
          left: { xs: theme.spacing(2), sm: theme.spacing(3) },
          width: isLg ? 152 : 102,
          height: isLg ? 152 : 102,
          flexShrink: "0",
          zIndex: 0,
        })}
      />
    </Box>
  );
}
