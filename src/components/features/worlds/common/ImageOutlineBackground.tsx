import { Box } from "@mui/material";

export interface ImageOutlineBackgroundProps {
  rounded?: boolean;
}

export function ImageOutlineBackground(props: ImageOutlineBackgroundProps) {
  const { rounded } = props;

  return (
    <Box
      sx={(theme) => ({
        height: { xs: theme.spacing(6), lg: theme.spacing(10) },
      })}
    >
      <Box
        sx={(theme) => ({
          borderRadius: rounded ? "100%" : 1,
          position: "relative",
          border: `1px solid ${theme.palette.divider}`,
          top: theme.spacing(2),
          left: { xs: theme.spacing(2), md: theme.spacing(3) },
          width: { xs: 102, lg: 152 },
          height: { xs: 102, lg: 152 },
          flexShrink: "0",
          zIndex: 0,
        })}
      />
    </Box>
  );
}
