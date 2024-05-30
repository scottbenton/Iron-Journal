import { Fab, useMediaQuery, useTheme } from "@mui/material";
import MovesIcon from "@mui/icons-material/DirectionsRun";
import { OracleIcon } from "assets/OracleIcon";
import { useCallback, useState } from "react";
import { MoveDrawer } from "components/features/charactersAndCampaigns/MoveDrawer";
import { OracleDrawer } from "components/features/charactersAndCampaigns/OracleDrawer";
import { useFooterState } from "hooks/useFooterState";

interface CampaignMoveOracleButtonsProps {
  showFabs: boolean;
}

export function CampaignMoveOracleButtons(
  props: CampaignMoveOracleButtonsProps
) {
  const { showFabs } = props;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const [isMoveSidebarOpen, setIsMoveSidebarOpen] = useState(false);
  const closeMoveSidebar = useCallback(() => {
    setIsMoveSidebarOpen(false);
  }, []);
  const [isOracleSidebarOpen, setIsOracleSidebarOpen] = useState(false);
  const closeOracleSidebar = useCallback(() => {
    setIsOracleSidebarOpen(false);
  }, []);

  const { isFooterVisible, footerHeight } = useFooterState();

  if (!isSmall || !showFabs) {
    return null;
  }

  return (
    <>
      <Fab
        aria-label={"Oracles"}
        color={"primary"}
        size={"small"}
        sx={{
          borderRadius: 1,
          zIndex: "unset",
          position: "fixed",
          bottom: `calc(${theme.spacing(9)} + ${
            isFooterVisible ? footerHeight : 0
          }px)`,
          transition: theme.transitions.create(["bottom", "transform"]),
          right: theme.spacing(2),
        }}
        onClick={() => setIsOracleSidebarOpen(true)}
      >
        <OracleIcon />
      </Fab>
      <Fab
        variant={"extended"}
        color={"primary"}
        sx={(theme) => ({
          borderRadius: 1,
          zIndex: "unset",
          position: "fixed",
          right: theme.spacing(2),
          bottom: `calc(${theme.spacing(2)} + ${
            isFooterVisible ? footerHeight : 0
          }px)`,
          transition: theme.transitions.create(["bottom", "transform"]),
        })}
        onClick={() => setIsMoveSidebarOpen(true)}
      >
        <MovesIcon sx={{ mr: 1 }} />
        Moves
      </Fab>
      <MoveDrawer open={isMoveSidebarOpen} onClose={closeMoveSidebar} />
      <OracleDrawer open={isOracleSidebarOpen} onClose={closeOracleSidebar} />
    </>
  );
}
