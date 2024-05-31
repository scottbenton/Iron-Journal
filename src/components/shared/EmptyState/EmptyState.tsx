import { Box, SxProps, Typography } from "@mui/material";
import { useThemeValue } from "providers/ThemeProvider/useThemeValue";
import { ReactNode } from "react";

export interface EmptyStateProps {
  showImage?: boolean;
  title?: string;
  message?: string | React.ReactNode;
  callToAction?: React.ReactNode;
  sx?: SxProps;
  leftAlign?: boolean;
}

export function EmptyState(props: EmptyStateProps) {
  const { showImage, title, message, callToAction, leftAlign, sx } = props;

  const emptyStateImage = useThemeValue("emptyStateImage") as ReactNode;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={leftAlign ? "flex-start" : "center"}
      mt={showImage ? 8 : 2}
      sx={sx}
    >
      {showImage && emptyStateImage}
      <Box
        maxWidth={"48ch"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
      >
        {title && (
          <Typography variant={"h4"} mt={2} textAlign={"center"}>
            {title}
          </Typography>
        )}
        {message && (
          <Typography
            variant={"body1"}
            color={"textSecondary"}
            textAlign={"center"}
          >
            {message}
          </Typography>
        )}
        {callToAction && <Box mt={2}>{callToAction}</Box>}
      </Box>
    </Box>
  );
}
