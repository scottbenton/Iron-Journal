import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export interface ContainedTabPanelProps extends PropsWithChildren {
  greyBackground?: boolean;
  isVisible: boolean;
}

export function ContainedTabPanel(props: ContainedTabPanelProps) {
  const { greyBackground, isVisible, children } = props;

  if (!isVisible) return null;

  return (
    <Box
      flexGrow={1}
      overflow={"auto"}
      bgcolor={(theme) =>
        greyBackground ? theme.palette.background.default : undefined
      }
    >
      {children}
    </Box>
  );
}
