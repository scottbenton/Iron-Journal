import { Box, SxProps, Theme } from "@mui/material";
import { PropsWithChildren } from "react";

interface PageSidebarProps {
  sx?: SxProps<Theme>;
}

export function PageSidebar(props: PropsWithChildren<PageSidebarProps>) {
  const { children, sx } = props;

  return (
    <Box
      borderRadius={1}
      bgcolor="background.paperInlay"
      border={(theme) => `1px solid ${theme.palette.divider}`}
      overflow={"auto"}
      sx={sx}
    >
      {children}
    </Box>
  );
}
