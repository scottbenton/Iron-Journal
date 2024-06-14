import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useConfirm } from "material-ui-confirm";
import { RtcRichTextEditor } from "components/shared/RichTextEditor/RtcRichTextEditor";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";
import { useStore } from "stores/store";
import { useListenToCurrentLocation } from "stores/world/currentWorld/locations/useListenToCurrentLocation";
import { BondsSection } from "components/features/worlds/BondsSection";
import { LocationNPCs } from "./LocationNPCs";
import { useWorldPermissions } from "../useWorldPermissions";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_LABEL } from "lib/storage.lib";
import { useSnackbar } from "providers/SnackbarProvider";
import { GuideAndPlayerHeader, GuideOnlyHeader } from "../common";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import {
  FieldConfig,
  NameConfig,
  locationConfigs,
} from "config/locations.config";
import { LocationField } from "./LocationField";
import { DebouncedOracleInput } from "components/shared/DebouncedOracleInput";
import { PageWithImage } from "../common/PageWithImage";
import { IconColors } from "types/Icon.type";
import { mergeIcons } from "components/shared/GameIcons/mergeIcons";

export interface OpenLocationProps {
  worldId: string;
  locationId: string;
  location: LocationWithGMProperties;
  closeLocation: () => void;
  showHiddenTag?: boolean;
  openNPCTab: () => void;
}

export function OpenLocation(props: OpenLocationProps) {
  const {
    worldId,
    locationId,
    location,
    closeLocation,
    showHiddenTag,
    openNPCTab,
  } = props;

  const { showGMFields, showGMTips, isGuidedGame } = useWorldPermissions();

  // Todo - replace with world type from datasworn once released
  const settingId = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "ironlands",
    [GAME_SYSTEMS.STARFORGED]: "forge",
  });
  let settingConfig = { ...locationConfigs[settingId] };
  if (location.type && settingConfig.locationTypeOverrides?.[location.type]) {
    settingConfig = {
      ...settingConfig,
      ...settingConfig?.locationTypeOverrides[location.type],
    };
  }
  useListenToCurrentLocation(locationId);

  const { error } = useSnackbar();
  const confirm = useConfirm();

  const updateLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.updateLocation
  );

  const updateLocationGMNotes = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.updateLocationGMNotes
  );
  const deleteLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.deleteLocation
  );
  const updateLocationNotes = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.updateLocationNotes
  );
  const uploadLocationImage = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.uploadLocationImage
  );
  const removeLocationImage = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.removeLocationImage
  );

  const currentCharacterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId
  );
  const singleplayerBond =
    currentCharacterId && location.characterBonds
      ? location.characterBonds[currentCharacterId]
      : false;
  const updateLocationCharacterBond = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations
        .updateLocationCharacterBond
  );

  const nameConfig: NameConfig | undefined = settingConfig.name;
  const sharedFieldConfig: FieldConfig[] = settingConfig.sharedFields ?? [];
  const gmFieldConfig: FieldConfig[] = settingConfig.gmFields ?? [];

  const handleLocationDelete = () => {
    confirm({
      title: `Delete ${location.name}`,
      description:
        "Are you sure you want to delete this location? It will be deleted from ALL of your characters and campaigns that use this world. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteLocation(locationId)
          .catch(() => {})
          .then(() => {
            closeLocation();
          });
      })
      .catch(() => {});
  };

  const onFileUpload = (file: File) => {
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        error(
          `File is too large. The max file size is ${MAX_FILE_SIZE_LABEL}.`
        );
        return;
      }
      uploadLocationImage(locationId, file).catch(() => {});
    }
  };

  const icon = mergeIcons(
    {
      key: "GiCompass",
      color: IconColors.White,
    },
    settingConfig.defaultIcon,
    location.icon
  );

  return (
    <PageWithImage
      imageUrl={location.imageUrl}
      icon={icon}
      actions={
        <>
          {showGMFields && (
            <Tooltip title={"Delete"}>
              <IconButton onClick={() => handleLocationDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      }
      name={location.name}
      nameInput={
        <DebouncedOracleInput
          label={"Name"}
          variant={"outlined"}
          color={"primary"}
          oracleTableId={nameConfig?.oracleIds}
          joinOracleTables={nameConfig?.joinOracles}
          initialValue={location.name}
          updateValue={(newName) =>
            updateLocation(locationId, { name: newName }).catch(() => {})
          }
          fullWidth={true}
          sx={{
            mt: 1,
          }}
        />
      }
      handleImageUpload={onFileUpload}
      handleIconSelection={(icon) => {
        if (location.imageUrl) {
          removeLocationImage(locationId).catch(() => {});
        }
        updateLocation(locationId, { icon }).catch(() => {});
      }}
      handleImageRemove={() => removeLocationImage(locationId)}
      handlePageClose={closeLocation}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Box mt={1}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            {sharedFieldConfig.map((field) => (
              <Grid item xs={12} md={6} key={field.key}>
                <LocationField
                  locationId={locationId}
                  location={location}
                  field={field}
                  isGMField={false}
                />
              </Grid>
            ))}
            {showGMFields && (
              <>
                {showGMTips && (
                  <>
                    <Grid item xs={12}>
                      <GuideOnlyHeader breakContainer />
                    </Grid>
                  </>
                )}
                {gmFieldConfig.map((field) => (
                  <Grid item xs={12} md={6} key={field.key}>
                    <LocationField
                      locationId={locationId}
                      location={location}
                      field={field}
                      isGMField
                    />
                  </Grid>
                ))}
                {isGuidedGame && showGMFields && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ alignItems: "center", display: "flex" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={location.sharedWithPlayers ?? false}
                          onChange={(evt, value) =>
                            updateLocation(locationId, {
                              sharedWithPlayers: value,
                            }).catch(() => {})
                          }
                        />
                      }
                      label="Visible to Players"
                    />
                  </Grid>
                )}
                {!isGuidedGame && settingConfig.showBasicBond && (
                  <BondsSection
                    isStarforged={false}
                    hasConnection={false}
                    onBondToggle={
                      currentCharacterId
                        ? (bonded) =>
                            updateLocationCharacterBond(
                              locationId,
                              currentCharacterId,
                              bonded
                            ).catch(() => {})
                        : undefined
                    }
                    isBonded={singleplayerBond}
                  />
                )}
                <Grid item xs={12}>
                  <RtcRichTextEditor
                    id={locationId}
                    roomPrefix={`iron-fellowship-${worldId}-location-gmnotes-`}
                    documentPassword={worldId}
                    onSave={updateLocationGMNotes}
                    initialValue={location.gmProperties?.gmNotes}
                  />
                </Grid>
              </>
            )}
            {isGuidedGame && (
              <>
                {showGMTips && (
                  <Grid item xs={12}>
                    <GuideAndPlayerHeader breakContainer />
                  </Grid>
                )}
                {settingConfig.showBasicBond && (
                  <BondsSection
                    isStarforged={false}
                    hasConnection={false}
                    onBondToggle={
                      currentCharacterId
                        ? (bonded) =>
                            updateLocationCharacterBond(
                              locationId,
                              currentCharacterId,
                              bonded
                            ).catch(() => {})
                        : undefined
                    }
                    isBonded={singleplayerBond}
                  />
                )}
                {!location.sharedWithPlayers && (
                  <Grid item xs={12}>
                    <Alert severity="warning">
                      These notes are not yet visible to players because this
                      location is hidden from them.
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  {(location.notes || location.notes === null) && (
                    <RtcRichTextEditor
                      id={locationId}
                      roomPrefix={`iron-fellowship-${worldId}-location-`}
                      documentPassword={worldId}
                      onSave={updateLocationNotes}
                      initialValue={location.notes || undefined}
                    />
                  )}
                </Grid>
              </>
            )}
            <LocationNPCs
              locationId={locationId}
              showHiddenTag={showHiddenTag}
              openNPCTab={openNPCTab}
            />
          </Grid>
        </Box>
      </Box>
    </PageWithImage>
  );
}
