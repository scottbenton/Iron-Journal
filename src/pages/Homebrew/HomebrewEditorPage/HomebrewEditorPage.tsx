import { Box, Button, LinearProgress, Typography } from "@mui/material";
import {
  PageContent,
  PageHeader,
  PageHeaderProps,
} from "components/shared/Layout";
import { StyledTab, StyledTabs } from "components/shared/StyledTabs";
import { useEffect, useMemo, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { AboutSection } from "./AboutSection";
import { useStore } from "stores/store";
import { EmptyState } from "components/shared/EmptyState";
import { BASE_ROUTES, basePaths } from "routes";
import { RulesSection } from "./RulesSection";
import { useListenToHomebrewContent } from "stores/homebrew/useListenToHomebrewContent";
import { useUpdateQueryStringValueWithoutNavigation } from "hooks/useUpdateQueryStringValueWithoutNavigation";
import { OracleSection } from "./OracleSection";
import { MovesSection } from "./MovesSection";
import { AssetsSection } from "./AssetsSection/AssetsSection";

enum TABS {
  ABOUT = "about",
  MOVES = "moves",
  ORACLES = "oracles",
  ASSETS = "assets",
  RULES = "rules",
}

export function HomebrewEditorPage() {
  const { homebrewId } = useParams();

  const homebrewIds = useMemo(() => {
    return homebrewId ? [homebrewId] : [];
  }, [homebrewId]);

  useListenToHomebrewContent(homebrewIds);

  const navigate = useNavigate();

  const loading = useStore((store) => store.homebrew.loading);
  const homebrewDetails = useStore(
    (store) => {
      return store.homebrew.collections[homebrewId ?? ""]?.base;
    },
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );
  const homebrewName = homebrewDetails?.title || "Unnamed Collection";

  const deleteCollection = useStore((store) => store.homebrew.deleteExpansion);

  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState(
    (searchParams.get("tab") as TABS) ?? TABS.ABOUT
  );
  useUpdateQueryStringValueWithoutNavigation("tab", selectedTab);
  const handleTabChange = (tab: TABS) => {
    setSelectedTab(tab);
  };

  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSyncLoading(false);
    }, 2 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const uid = useStore(
    (store) => store.auth.user?.uid,
    (a, b) => a === b
  );

  if (loading || (!homebrewDetails && syncLoading)) {
    return <LinearProgress />;
  }
  if (!homebrewId || !homebrewDetails) {
    return (
      <EmptyState
        title={"Homebrew Collection not Found"}
        message={"Please try again from the homebrew selection page"}
        showImage
        callToAction={
          <Button
            component={Link}
            to={basePaths[BASE_ROUTES.HOMEBREW]}
            variant={"contained"}
            size={"large"}
          >
            Your Homebrew
          </Button>
        }
      />
    );
  }

  const isLoggedIn = !!uid;
  const isEditor = uid
    ? homebrewDetails?.editors.includes(uid) ?? false
    : false;
  const isViewer = uid
    ? homebrewDetails?.viewers?.includes(uid) ?? false
    : false;

  const getPageHeaderProps = (): Partial<PageHeaderProps> => {
    if (isEditor) {
      return {
        actions: (
          <Button
            variant={"outlined"}
            color={"inherit"}
            onClick={() =>
              deleteCollection(homebrewId)
                .then(() => {
                  navigate(basePaths[BASE_ROUTES.HOMEBREW]);
                })
                .catch(() => {})
            }
          >
            Delete Collection
          </Button>
        ),
      };
    } else if (isViewer) {
      return {};
    } else if (isLoggedIn) {
      return {
        subLabel:
          "You can use this homebrew in your characters and campaigns by adding it to your collection",
        actions: (
          <Button variant={"outlined"} color={"inherit"}>
            Add to your Collection
          </Button>
        ),
      };
    } else {
      return {
        subLabel: (
          <Typography variant={"body2"}>
            Log in or sign up to use this homebrew in your game
          </Typography>
        ),
        actions: (
          <>
            <Button color={"inherit"}>Log in</Button>
            <Button variant={"outlined"} color={"inherit"}>
              Sign Up
            </Button>
          </>
        ),
      };
    }
  };

  return (
    <>
      <PageHeader label={homebrewName} {...getPageHeaderProps()} />
      <PageContent isPaper>
        <Box
          sx={{
            mx: { xs: -2, sm: -3 },
          }}
        >
          <StyledTabs
            value={selectedTab}
            onChange={(evt, value) => handleTabChange(value)}
            sx={(theme) => ({
              borderTopRightRadius: theme.shape.borderRadius,
              borderTopLeftRadius: theme.shape.borderRadius,
            })}
          >
            <StyledTab label={"About"} value={TABS.ABOUT} />
            <StyledTab label={"Rules"} value={TABS.RULES} />
            <StyledTab label={"Moves"} value={TABS.MOVES} />
            <StyledTab label={"Oracles"} value={TABS.ORACLES} />
            <StyledTab label={"Assets"} value={TABS.ASSETS} />
          </StyledTabs>
          <Box role={"tabpanel"} sx={{ px: { xs: 2, sm: 3 } }}>
            {selectedTab === TABS.ABOUT && (
              <AboutSection id={homebrewId} isEditor={isEditor} />
            )}
            {selectedTab === TABS.RULES && (
              <RulesSection id={homebrewId} isEditor={isEditor} />
            )}
            {selectedTab === TABS.MOVES && (
              <MovesSection homebrewId={homebrewId} />
            )}
            {selectedTab === TABS.ORACLES && <OracleSection id={homebrewId} />}
            {selectedTab === TABS.ASSETS && (
              <AssetsSection homebrewId={homebrewId} />
            )}
          </Box>
        </Box>
      </PageContent>
    </>
  );
}
