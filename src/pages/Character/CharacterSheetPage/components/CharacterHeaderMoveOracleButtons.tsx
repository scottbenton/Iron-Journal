import { Box, Fab } from "@mui/material";
import { OracleDrawer } from "components/features/charactersAndCampaigns/OracleDrawer";
import { MoveDrawer } from "components/features/charactersAndCampaigns/MoveDrawer";
import { useCallback, useState } from "react";
import MovesIcon from "@mui/icons-material/DirectionsRun";
import { OracleIcon } from "assets/OracleIcon";
import { useCampaignType } from "hooks/useCampaignType";

export interface MoveOracleButtonProps {
  disableTopMargin?: boolean;
}

export function CharacterHeaderMoveOracleButtons(props: MoveOracleButtonProps) {
  const { disableTopMargin } = props;

  const [isMoveSidebarOpen, setIsMoveSidebarOpen] = useState(false);
  const closeMoveSidebar = useCallback(() => {
    setIsMoveSidebarOpen(false);
  }, []);
  const [isOracleSidebarOpen, setIsOracleSidebarOpen] = useState(false);
  const closeOracleSidebar = useCallback(() => {
    setIsOracleSidebarOpen(false);
  }, []);

  const shouldShowOracles = !useCampaignType().showGuidedPlayerView;

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={{
          xs: shouldShowOracles ? "center" : "flex-start",
          sm: "flex-start",
        }}
        gap={2}
        mt={disableTopMargin ? 0 : -4}
      >
        <Fab
          variant={"extended"}
          color={"primary"}
          sx={{ borderRadius: 4, zIndex: "unset" }}
          onClick={() => setIsMoveSidebarOpen(true)}
        >
          <MovesIcon sx={{ mr: 1 }} />
          Moves
        </Fab>
        {shouldShowOracles && (
          <Fab
            variant={"extended"}
            color={"primary"}
            sx={{ borderRadius: 4, zIndex: "unset" }}
            onClick={() => setIsOracleSidebarOpen(true)}
          >
            <OracleIcon sx={{ mr: 1 }} />
            Oracles
          </Fab>
        )}
      </Box>
      <MoveDrawer open={isMoveSidebarOpen} onClose={closeMoveSidebar} />
      <OracleDrawer open={isOracleSidebarOpen} onClose={closeOracleSidebar} />
    </>
  );
}
