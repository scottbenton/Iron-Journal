import { Button, LinearProgress } from "@mui/material";
import { WorldSheet } from "components/features/worlds/WorldSheet";
import { useConfirm } from "material-ui-confirm";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSyncStore } from "./hooks/useSyncStore";
import { useEffect, useState } from "react";
import { LocationsSection } from "components/features/worlds/Locations";
import { BreakContainer } from "components/shared/BreakContainer";
import { WORLD_ROUTES, constructWorldPath } from "../routes";
import { PageContent, PageHeader } from "components/shared/Layout";
import { StyledTab, StyledTabs } from "components/shared/StyledTabs";
import DeleteIcon from "@mui/icons-material/Delete";
import { NPCSection } from "components/features/worlds/NPCSection";
import { Head } from "providers/HeadProvider/Head";
import { useStore } from "stores/store";
import { LoreSection } from "components/features/worlds/Lore";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { SectorSection } from "components/features/worlds/SectorSection";
import { EmptyState } from "components/shared/EmptyState";
import { LinkComponent } from "components/shared/LinkComponent";
import { useUpdateQueryStringValueWithoutNavigation } from "hooks/useUpdateQueryStringValueWithoutNavigation";

export enum TABS {
  DETAILS = "details",
  SECTORS = "sectors",
  LOCATIONS = "locations",
  NPCS = "npcs",
  LORE = "lore",
}

export function WorldSheetPage() {
  useSyncStore();

  const showSectorsInsteadOfLocations =
    useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  const [searchParams] = useSearchParams();
  const [selectedTab, setSelectedTab] = useState<TABS>(
    (searchParams.get("tab") as TABS) ?? TABS.DETAILS
  );
  useUpdateQueryStringValueWithoutNavigation("tab", selectedTab);
  const handleTabChange = (tab: TABS) => {
    setSelectedTab(tab);
  };

  const worldId = useStore((store) => store.worlds.currentWorld.currentWorldId);
  const world = useStore((store) => store.worlds.currentWorld.currentWorld);
  const canEdit = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorld?.ownerIds.includes(
        store.auth.uid
      ) ?? false
  );
  const isLoading = useStore((store) => store.worlds.loading);

  const confirm = useConfirm();
  const navigate = useNavigate();
  const deleteWorld = useStore((store) => store.worlds.deleteWorld);

  const [syncLoading, setSyncLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSyncLoading(false);
    }, 2 * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  if (isLoading || (!world && syncLoading)) {
    return <LinearProgress />;
  }

  if (!world || !worldId) {
    return (
      <>
        <PageHeader />
        <PageContent isPaper>
          <EmptyState
            showImage
            title={"World not Found"}
            message={
              "Please return to the world selection page to choose a world"
            }
            callToAction={
              <Button
                LinkComponent={LinkComponent}
                href={constructWorldPath(WORLD_ROUTES.SELECT)}
                variant={"contained"}
                size={"large"}
              >
                Select a World
              </Button>
            }
          />
        </PageContent>
      </>
    );
  }

  const handleDeleteClick = () => {
    confirm({
      title: `Delete ${world.name}`,
      description:
        "Are you sure you want to delete this world? It will be deleted from ALL of your characters and campaigns. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteWorld(worldId)
          .then(() => {
            navigate(constructWorldPath(WORLD_ROUTES.SELECT));
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <>
      <Head title={world.name} description={`World page for ${world.name}`} />
      <PageHeader
        label={world.name}
        actions={
          <Button
            color={"inherit"}
            variant={"outlined"}
            onClick={() => handleDeleteClick()}
            endIcon={<DeleteIcon />}
          >
            Delete World
          </Button>
        }
      />
      <PageContent isPaper>
        <BreakContainer>
          <StyledTabs
            value={selectedTab}
            onChange={(evt, value) => handleTabChange(value)}
            indicatorColor="primary"
            centered
            variant={"standard"}
            sx={(theme) => ({
              borderTopRightRadius: theme.shape.borderRadius,
              borderTopLeftRadius: theme.shape.borderRadius,
            })}
          >
            <StyledTab value={TABS.DETAILS} label={"World Details"} />
            {!showSectorsInsteadOfLocations && (
              <StyledTab value={TABS.LOCATIONS} label={"Locations"} />
            )}
            {showSectorsInsteadOfLocations && (
              <StyledTab value={TABS.SECTORS} label={"Sectors"} />
            )}
            <StyledTab value={TABS.NPCS} label={"NPCs"} />
            <StyledTab value={TABS.LORE} label={"Lore"} />
          </StyledTabs>
        </BreakContainer>
        {selectedTab === TABS.DETAILS && <WorldSheet canEdit={canEdit} />}
        {selectedTab === TABS.LOCATIONS && !showSectorsInsteadOfLocations && (
          <BreakContainer
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paperInlay,
              flexGrow: 1,
            })}
          >
            <LocationsSection
              showHiddenTag
              openNPCTab={() => setSelectedTab(TABS.NPCS)}
            />
          </BreakContainer>
        )}
        {selectedTab === TABS.SECTORS && showSectorsInsteadOfLocations && (
          <BreakContainer
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paperInlay,
              flexGrow: 1,
            })}
          >
            <SectorSection
              showHiddenTag
              openNPCTab={() => setSelectedTab(TABS.NPCS)}
            />
          </BreakContainer>
        )}
        {selectedTab === TABS.NPCS && (
          <BreakContainer
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paperInlay,
              flexGrow: 1,
            })}
          >
            <NPCSection showHiddenTag />
          </BreakContainer>
        )}
        {selectedTab === TABS.LORE && (
          <BreakContainer
            sx={(theme) => ({
              backgroundColor: theme.palette.background.paperInlay,
              flexGrow: 1,
            })}
          >
            <LoreSection showHiddenTag />
          </BreakContainer>
        )}
      </PageContent>
    </>
  );
}
