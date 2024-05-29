import { Box, SxProps } from "@mui/material";
import { ReactNode } from "react";

export interface SectionWithSidebarProps {
  sidebar?: ReactNode;
  sidebarWidth?: number;
  mainContent: ReactNode;
  sx?: SxProps;
}

export function SectionWithSidebar(props: SectionWithSidebarProps) {
  const { sidebar, sidebarWidth = 324, mainContent, sx } = props;

  const actualWidth = sidebar ? sidebarWidth : 0;

  return (
    <Box
      display={"flex"}
      sx={[
        (theme) => ({
          [theme.breakpoints.up("md")]: {
            overflow: "hidden",
            height: "100%",
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {sidebar && (
        <Box
          sx={{
            height: "100%",
            width: actualWidth,
            display: { xs: "none", md: "block" },
          }}
        >
          {sidebar}
        </Box>
      )}
      <Box
        sx={(theme) => ({
          maxWidth: "100%",
          flexGrow: 1,
          [theme.breakpoints.up("md")]: {
            pl: sidebar ? 2 : 0,
            height: "100%",
            maxWidth: `calc(100% - ${actualWidth}px)`,
            width: "100%",
          },
        })}
      >
        <Box display={"flex"} height={"100%"} flexDirection={"column"}>
          {mainContent}
        </Box>
      </Box>
    </Box>
  );
}
