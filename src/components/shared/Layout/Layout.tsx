import { Box, LinearProgress } from "@mui/material";
import { Outlet } from "react-router-dom";
import { UserNameDialog } from "components/shared/UserNameDialog";
import { useStore } from "stores/store";
import { AUTH_STATE } from "stores/auth/auth.slice.type";
import { SkipToContentButton } from "./SkipToContentButton";
import { useSyncFeatureFlags } from "hooks/featureFlags/useSyncFeatureFlags";
import { LinkedDialog } from "components/features/charactersAndCampaigns/LinkedDialog";
import { LiveRegion } from "../LiveRegion";
import { RollSnackbarSection } from "./RollSnackbarSection";
import { BottomNav } from "./nav/BottomNav";
import { NavRail } from "./nav/NavRail";
import { TopNav } from "./nav/TopNav";
import { LayoutPathListener } from "./LayoutPathListener";
import { StarforgedStarBackground } from "./StarforgedStarBackground";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { useNewSunderedIslesTheme } from "hooks/featureFlags/useNewSunderedIslesTheme";

export function Layout() {
  useSyncFeatureFlags();

  const state = useStore((store) => store.auth.status);

  const userNameDialogOpen = useStore((store) => store.auth.userNameDialogOpen);
  const closeUserNameDialog = useStore(
    (store) => store.auth.closeUserNameDialog
  );

  const { gameSystem } = useGameSystem();
  const showNewSunderedIslesTheme = useNewSunderedIslesTheme();
  const showStarforgedTheming =
    gameSystem === GAME_SYSTEMS.STARFORGED && !showNewSunderedIslesTheme;

  if (state === AUTH_STATE.LOADING) {
    return <LinearProgress color={"primary"} />;
  }

  return (
    <Box
      minHeight={"100vh"}
      display={"flex"}
      flexDirection={"column"}
      sx={(theme) => ({
        backgroundColor: showStarforgedTheming
          ? undefined
          : theme.palette.background.default,
      })}
    >
      {showStarforgedTheming && <StarforgedStarBackground />}
      <Box
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        maxHeight={{ xs: undefined, sm: "100vh" }}
        flexGrow={1}
      >
        <LiveRegion />
        <SkipToContentButton />
        <LayoutPathListener />
        <TopNav />
        <NavRail />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: { xs: "unset", sm: "auto" },
          }}
          component={"main"}
          id={"main-content"}
        >
          <Outlet />
        </Box>
      </Box>
      <BottomNav />
      <UserNameDialog
        open={userNameDialogOpen}
        handleClose={closeUserNameDialog}
      />
      <LinkedDialog />
      <RollSnackbarSection />
    </Box>
  );
}
