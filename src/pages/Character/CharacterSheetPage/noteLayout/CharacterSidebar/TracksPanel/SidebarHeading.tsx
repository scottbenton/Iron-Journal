import { Box, Stack, SxProps, Theme, Typography } from "@mui/material";
import { ReactNode } from "react";

export interface SidebarHeading {
  label: string;
  action?: ReactNode;
  sx?: SxProps<Theme>;
}

export function SidebarHeading(props: SidebarHeading) {
  const { label, action, sx } = props;

  return (
    <Box
      bgcolor={(theme) => theme.palette.background.paperInlayDarker}
      py={0.5}
      display={"flex"}
      justifyContent={"space-between"}
      sx={[
        {
          flexDirection: "column",
          alignItems: "center",

          marginX: -2,
          paddingX: 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Typography
        variant={"h6"}
        fontFamily={(theme) => theme.fontFamilyTitle}
        color={(theme) => theme.palette.text.secondary}
      >
        {label}
      </Typography>
      {action && (
        <Stack direction={{ xs: "column", md: "row" }} spacing={1}>
          {action}
        </Stack>
      )}
    </Box>
  );
}
