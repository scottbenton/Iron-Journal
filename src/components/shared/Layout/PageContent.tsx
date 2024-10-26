import { Breakpoint, Container, Paper, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { PropsWithChildren } from "react";

export interface PageContentProps extends PropsWithChildren {
  isPaper?: boolean;
  viewHeight?: boolean;
  hiddenHeader?: boolean;
  maxWidth?: false | Breakpoint;
  sx?: SxProps<Theme>;
}

export function PageContent(props: PageContentProps) {
  const { children, isPaper, viewHeight, hiddenHeader, maxWidth, sx } = props;

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      component={isPaper ? Paper : "div"}
      maxWidth={maxWidth ?? false}
      sx={[
        (theme) => ({
          position: "relative",
          borderRadius: isPaper ? `${theme.shape.borderRadius}px` : 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          flexGrow: 1,
          pl: !isMobile ? 0 : undefined,
          pb: 2,
          display: "flex",
          flexDirection: "column",
        }),
        viewHeight
          ? (theme) => ({
              [theme.breakpoints.up("md")]: {
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              },
              mt: hiddenHeader ? -4 : 0,
              borderRadius: hiddenHeader ? 0 : undefined,
            })
          : {},
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Container>
  );
}
