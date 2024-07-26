import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export interface ContainedTabPanelProps extends PropsWithChildren {
  greyBackground?: boolean;
  isVisible: boolean;
  overflowAuto?: boolean;
}

export function ContainedTabPanel(props: ContainedTabPanelProps) {
  const { greyBackground, isVisible, overflowAuto = true, children } = props;

  if (!isVisible) return null;

  return (
    <Box
      role={"tabpanel"}
      flexGrow={1}
      overflow={overflowAuto ? "auto" : undefined}
      bgcolor={(theme) =>
        greyBackground ? theme.palette.background.paperInlay : undefined
      }
    >
      {children}
    </Box>
  );
}
