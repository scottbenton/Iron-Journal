import {
  IconButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useRef, useState } from "react";
import { logout } from "lib/auth.lib";
import LogoutIcon from "@mui/icons-material/Logout";
import { useToggleTheme } from "providers/ThemeProvider";
import LightThemeIcon from "@mui/icons-material/LightMode";
import DarkThemeIcon from "@mui/icons-material/DarkMode";
import { ThemeType } from "providers/ThemeProvider/themes/theme.types";
import { useGameSystem } from "hooks/useGameSystem";
import { getIsLocalEnvironment } from "functions/getGameSystem";
import SystemIcon from "@mui/icons-material/Casino";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import {
  CHARACTER_ROUTES,
  constructCharacterPath,
} from "pages/Character/routes";
import AccessibilityIcon from "@mui/icons-material/AccessibilityNew";
import { AccessibilitySettingsDialog } from "./AccessibilitySettingsDialog";
import SettingsIcon from "@mui/icons-material/Settings";
import { BetaTestsDialog } from "./BetaTestsDialog";
import TestsIcon from "@mui/icons-material/AutoAwesome";
import { useIsMobile } from "hooks/useIsMobile";
import { useStore } from "stores/store";
import { AUTH_STATE } from "stores/auth/auth.slice.type";
import { UserNameDialog } from "components/shared/UserNameDialog";
import UsernameIcon from "@mui/icons-material/AccountCircle";
import TokenIcon from "@mui/icons-material/Contacts";
import { CustomTokenDialog } from "./CustomTokenDialog/CustomTokenDialog";
import { activeFeatureFlags } from "hooks/featureFlags/activeFeatureFlags";
import { ExportGameState } from "pages/Campaign/CampaignPage/components/CampaignSettingsMenu/ExportGameState";

export function SettingsMenu() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const { themeType, toggleTheme } = useToggleTheme();

  const { gameSystem, chooseGameSystem } = useGameSystem();
  const isLocal = getIsLocalEnvironment();

  const [accessibilitySettingsOpen, setAccessibilitySettingsOpen] =
    useState(false);

  const [betaTestsOpen, setBetaTestsOpen] = useState(false);
  const [usernameDialogOpen, setUsernameDialogOpen] = useState(false);
  const [customTokenDialogOpen, setCustomTokenDialogOpen] = useState(false);

  const [exportDialogOpen, setExportDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  const isLoggedIn = useStore(
    (store) => store.auth.status === AUTH_STATE.AUTHENTICATED
  );

  return (
    <>
      <Tooltip
        title={"User Settings"}
        placement={isMobile ? "bottom" : "right"}
      >
        <IconButton
          color={"inherit"}
          className={"dark-focus-outline"}
          aria-label={"User Settings Menu Toggle"}
          ref={anchorRef}
          onClick={() => setMenuOpen(true)}
        >
          <SettingsIcon
            sx={(theme) => ({
              transform: `rotate(${menuOpen ? "90deg" : "0deg"})`,
              transition: theme.transitions.create(["transform"], {
                duration: theme.transitions.duration.shorter,
              }),
            })}
          />
        </IconButton>
      </Tooltip>
      <Menu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchorEl={anchorRef.current}
        anchorOrigin={
          isMobile
            ? { vertical: "bottom", horizontal: "right" }
            : { vertical: "top", horizontal: "left" }
        }
        transformOrigin={
          isMobile
            ? { vertical: "top", horizontal: "right" }
            : { vertical: "bottom", horizontal: "left" }
        }
        MenuListProps={{
          subheader: (
            <ListSubheader component={"div"} disableSticky>
              User Settings
            </ListSubheader>
          ),
        }}
      >
        {isLoggedIn && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              setUsernameDialogOpen(true);
            }}
          >
            <ListItemIcon>
              <UsernameIcon />
            </ListItemIcon>
            <ListItemText>Update Username</ListItemText>
          </MenuItem>
        )}
        {isLoggedIn && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              setAccessibilitySettingsOpen(true);
            }}
          >
            <ListItemIcon>
              <AccessibilityIcon />
            </ListItemIcon>
            <ListItemText>Accessibility Settings</ListItemText>
          </MenuItem>
        )}
        {activeFeatureFlags.length > 0 && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              setBetaTestsOpen(true);
            }}
          >
            <ListItemIcon>
              <TestsIcon />
            </ListItemIcon>
            <ListItemText>Beta Tests</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setMenuOpen(false);
            toggleTheme();
          }}
        >
          <ListItemIcon>
            {themeType === ThemeType.Light ? (
              <DarkThemeIcon />
            ) : (
              <LightThemeIcon />
            )}
          </ListItemIcon>
          <ListItemText>
            {themeType === ThemeType.Light ? "Dark Mode" : "Light Mode"}
          </ListItemText>
        </MenuItem>
        {isLoggedIn && (
          <MenuItem
            onClick={() => {
              setMenuOpen(false);
              logout().then(() => window.location.reload());
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setMenuOpen(false);
            setExportDialogOpen(true);
          }}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>Export Game State</ListItemText>
        </MenuItem>
        {isLocal && (
          <MenuItem
            onClick={() => {
              chooseGameSystem(
                gameSystem === GAME_SYSTEMS.IRONSWORN
                  ? GAME_SYSTEMS.STARFORGED
                  : GAME_SYSTEMS.IRONSWORN
              );
              setMenuOpen(false);
              location.pathname = constructCharacterPath(
                CHARACTER_ROUTES.SELECT
              );
            }}
          >
            <ListItemIcon>
              <SystemIcon />
            </ListItemIcon>
            <ListItemText>Switch System</ListItemText>
          </MenuItem>
        )}
        {isLocal && (
          <MenuItem onClick={() => setCustomTokenDialogOpen(true)}>
            <ListItemIcon>
              <TokenIcon />
            </ListItemIcon>
            <ListItemText>Login with Custom Token</ListItemText>
          </MenuItem>
        )}
      </Menu>
      <AccessibilitySettingsDialog
        open={accessibilitySettingsOpen}
        onClose={() => setAccessibilitySettingsOpen(false)}
      />
      <BetaTestsDialog
        open={betaTestsOpen}
        onClose={() => setBetaTestsOpen(false)}
      />
      <UserNameDialog
        open={usernameDialogOpen}
        handleClose={() => setUsernameDialogOpen(false)}
        updating
      />
      {isLocal && (
        <CustomTokenDialog
          open={customTokenDialogOpen}
          onClose={() => setCustomTokenDialogOpen(false)}
        />
      )}
      <ExportGameState
        open={exportDialogOpen}
        onClose={() => setExportDialogOpen(false)}
      />
    </>
  );
}
