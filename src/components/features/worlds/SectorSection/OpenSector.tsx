import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Tooltip,
} from "@mui/material";
import { SectorMap } from "./SectorMap";
import { useStore } from "stores/store";
import { ItemHeader } from "../ItemHeader";
import { SECTOR_TABS } from "stores/world/currentWorld/sector/sector.slice.type";
import { SectorHexTypes } from "types/Sector.type";
import { SectorRegionAutocomplete } from "./SectorRegionAutocomplete";
import { useRoller } from "stores/appState/useRoller";
import { SectorLocationCard } from "./SectorLocationCard";
import { SectorLocationDialog } from "./SectorLocationDialog";
import { useWorldPermissions } from "../useWorldPermissions";
import { RtcRichTextEditor } from "components/shared/RichTextEditor";
import { NotesSectionHeader } from "../NotesSectionHeader";
import { NPCCard } from "../NPCSection/NPCCard";
import { DebouncedOracleInput } from "components/shared/DebouncedOracleInput";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { useCallback } from "react";

interface OpenSectorProps {
  sectorId: string;
  openNPCTab: () => void;
}

export function OpenSector(props: OpenSectorProps) {
  const { sectorId, openNPCTab } = props;
  const confirm = useConfirm();
  const { rollOracleTable } = useRoller();

  const worldId = useStore(
    (store) => store.worlds.currentWorld.currentWorldId ?? ""
  );
  const sector = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.sectors[sectorId]
  );
  const sectorLocations = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.locations.locations
  );

  const setOpenSectorId = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.setOpenSectorId
  );

  const updateSectorName = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.updateName
  );

  const openTab = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.openSectorTab
  );
  const setOpenTab = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.setOpenSectorTab
  );

  const updateSector = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.updateSector
  );
  const deleteSector = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.deleteSector
  );
  const addHexToMap = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.updateHex
  );
  const createLocation = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldSectors.locations.createLocation
  );

  const setOpenSectorLocationId = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldSectors.locations.setOpenLocationId
  );

  const oracleCollections = useStore(
    (store) => store.rules.oracleMaps.oracleCollectionMap
  );

  const handleAddHex = async (
    row: number,
    col: number,
    hexType?: SectorHexTypes
  ) => {
    let locationId: string | undefined = undefined;
    if (hexType === SectorHexTypes.Star) {
      const description = await rollOracleTable(
        "starforged/oracles/space/stellar_object",
        false
      );
      locationId = await createLocation({
        name: "New Star",
        type: SectorHexTypes.Star,
        description: description?.result ?? "",
      });
    } else if (hexType === SectorHexTypes.Planet) {
      const planetClass = await rollOracleTable(
        "starforged/oracles/planets/class",
        false
      );
      if (!planetClass) {
        return;
      }
      const convertedClass = planetClass?.result
        ?.split(" ")[0]
        .toLocaleLowerCase();

      const name = await rollOracleTable(
        `starforged/oracles/planets/${convertedClass}/name`,
        false
      );
      const planetClassName =
        convertedClass.charAt(0).toUpperCase() +
        convertedClass.slice(1) +
        " World";

      const planetClassCollectionId = convertedClass
        ? `starforged/collections/oracles/planets/${convertedClass}`
        : undefined;

      const description = planetClassCollectionId
        ? oracleCollections[planetClassCollectionId]?.summary
        : undefined;

      locationId = await createLocation({
        name: name?.result ?? "New Planet",
        type: SectorHexTypes.Planet,
        subType: convertedClass,
        planetClassName,
        description,
      });
    } else if (hexType === SectorHexTypes.Settlement) {
      const name = await rollOracleTable(
        "starforged/oracles/settlements/name",
        false
      );
      locationId = await createLocation({
        name: name?.result ?? "New Sector",
        type: SectorHexTypes.Settlement,
      });
    } else if (hexType === SectorHexTypes.Derelict) {
      locationId = await createLocation({
        name: "New Derelict",
        type: SectorHexTypes.Derelict,
      });
    } else if (hexType === SectorHexTypes.Vault) {
      locationId = await createLocation({
        name: "New Vault",
        type: SectorHexTypes.Vault,
      });
    } else if (hexType === SectorHexTypes.Other) {
      locationId = await createLocation({
        name: "Unknown Location",
        type: SectorHexTypes.Other,
      });
    }

    const cell:
      | {
          type: SectorHexTypes;
          locationId?: string;
        }
      | undefined = hexType ? { type: hexType } : undefined;
    if (cell && locationId) {
      cell.locationId = locationId;
    }
    addHexToMap(row, col, cell).catch(() => {});
  };

  const handleSectorDelete = () => {
    confirm({
      title: `Delete ${sector.name}`,
      description:
        "Are you sure you want to delete this sector? It will be deleted from ALL of your characters and campaigns that use this world. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteSector()
          .catch(() => {})
          .then(() => {
            setOpenSectorId();
          });
      })
      .catch(() => {});
  };

  const { showGMFields, showGMTips, isGuidedGame } = useWorldPermissions();
  const notes = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.openSectorNotes
  );
  const gmNotes = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.openSectorGMNotes
  );
  const updateNotes = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.updateSectorNotes
  );

  const npcs = useStore(
    (store) => store.worlds.currentWorld.currentWorldNPCs.npcMap
  );
  const filteredNPCIds = useStore((store) =>
    Object.keys(store.worlds.currentWorld.currentWorldNPCs.npcMap).filter(
      (npcId) =>
        store.worlds.currentWorld.currentWorldNPCs.npcMap[npcId]
          .lastSectorId === sectorId
    )
  );
  const setOpenNPC = useStore(
    (store) => store.worlds.currentWorld.currentWorldNPCs.setOpenNPCId
  );

  const noteSaveCallback = useCallback(
    (sectorId: string, notes: Uint8Array, isBeaconRequest?: boolean) =>
      updateNotes(sectorId, notes, false, isBeaconRequest),
    [updateNotes]
  );

  const gmNoteSaveCallback = useCallback(
    (sectorId: string, notes: Uint8Array, isBeaconRequest?: boolean) =>
      updateNotes(sectorId, notes, true, isBeaconRequest),
    [updateNotes]
  );

  if (!sector) {
    return null;
  }

  return (
    <Box>
      <SectorLocationDialog />
      <ItemHeader
        itemName={sector.name}
        updateName={(name) => updateSectorName(name).catch(() => {})}
        nameOracleIds={[
          "starforged/oracles/space/sector_name/prefix",
          "starforged/oracles/space/sector_name/suffix",
        ]}
        joinOracles
        actions={
          showGMFields && (
            <Tooltip title={"Delete Sector"}>
              <IconButton onClick={() => handleSectorDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )
        }
        sx={{ alignItems: "center" }}
        closeItem={() => setOpenSectorId()}
      />
      <SectorMap
        map={sector.map}
        addHex={(row, col, type) =>
          handleAddHex(row, col, type).catch(() => {})
        }
      />
      <Box
        sx={(theme) => ({
          bgcolor: theme.palette.background.paper,
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderWidth: 0,
          borderStyle: "solid",
          borderColor: theme.palette.divider,
        })}
      >
        <Grid container spacing={2} sx={{ px: 2, mt: 0 }}>
          <Grid item xs={12} md={6}>
            <SectorRegionAutocomplete />
          </Grid>
          {showGMFields && (
            <Grid item xs={12} md={6}>
              <DebouncedOracleInput
                label={"Sector Trouble"}
                oracleTableId={
                  "starforged/oracles/campaign_launch/sector_trouble"
                }
                initialValue={sector.trouble ?? ""}
                updateValue={(trouble) => updateSector({ trouble })}
              />
            </Grid>
          )}
          {showGMFields && isGuidedGame && (
            <Grid item xs={12} md={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={sector.sharedWithPlayers ?? false}
                    onChange={(evt, value) =>
                      updateSector({ sharedWithPlayers: value })
                    }
                  />
                }
                label={"Visible to Players"}
                sx={{}}
              />
            </Grid>
          )}
        </Grid>
        <Tabs
          value={openTab}
          onChange={(evt, value) => setOpenTab(value)}
          sx={(theme) => ({
            px: 2,
            mt: 2,
            borderBottom: `1px solid ${theme.palette.divider}`,
          })}
        >
          <Tab label={"Locations"} value={SECTOR_TABS.LOCATIONS} />
          <Tab label={"NPCs"} value={SECTOR_TABS.NPCS} />
          <Tab label={"Notes"} value={SECTOR_TABS.NOTES} />
        </Tabs>
        {openTab === SECTOR_TABS.LOCATIONS && (
          <Grid container spacing={2} sx={{ mt: 0, px: 2, pb: 2 }}>
            {Object.keys(sectorLocations)
              .sort((l1, l2) =>
                sectorLocations[l1].name.localeCompare(sectorLocations[l2].name)
              )
              .map((locationId) => (
                <Grid item xs={12} md={6} key={locationId}>
                  <SectorLocationCard
                    sectorLocation={sectorLocations[locationId]}
                    onClick={() => setOpenSectorLocationId(locationId)}
                  />
                </Grid>
              ))}
          </Grid>
        )}
        {openTab === SECTOR_TABS.NPCS && (
          <Grid container spacing={2} sx={{ mt: 0, px: 2, pb: 2 }}>
            {filteredNPCIds.map((npcId) => (
              <Grid item xs={12} md={6} key={npcId}>
                <NPCCard
                  npc={npcs[npcId]}
                  locations={{}}
                  sectors={{}}
                  openNPC={() => {
                    setOpenNPC(npcId);
                    openNPCTab();
                  }}
                />
              </Grid>
            ))}
          </Grid>
        )}
        {openTab === SECTOR_TABS.NOTES && (
          <Grid container spacing={2} sx={{ mt: 0, px: 2, pb: 2 }}>
            {showGMFields && (
              <Grid item xs={12}>
                <RtcRichTextEditor
                  id={sectorId}
                  roomPrefix={`sector-private-${worldId}-`}
                  documentPassword={sectorId}
                  onSave={gmNoteSaveCallback}
                  initialValue={gmNotes}
                />
              </Grid>
            )}
            {isGuidedGame && (
              <>
                {showGMTips && (
                  <NotesSectionHeader
                    sharedWithPlayers={sector.sharedWithPlayers}
                  />
                )}
                <Grid item xs={12}>
                  <RtcRichTextEditor
                    id={sectorId}
                    roomPrefix={`sector-public-${worldId}-`}
                    documentPassword={sectorId}
                    onSave={noteSaveCallback}
                    initialValue={notes}
                  />
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}
