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
import { LoreTagsAutocomplete } from "./LoreTagsAutocomplete";
import { useStore } from "stores/store";
import { LoreDocumentWithGMProperties } from "stores/world/currentWorld/lore/lore.slice.type";
import { useListenToCurrentLoreDocument } from "stores/world/currentWorld/lore/useListenToCurrentLoreDocument";
import { useWorldPermissions } from "../useWorldPermissions";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_LABEL } from "lib/storage.lib";
import { useSnackbar } from "providers/SnackbarProvider";
import { GuideAndPlayerHeader, GuideOnlyHeader } from "../common";
import { mergeIcons } from "components/shared/GameIcons/mergeIcons";
import { IconColors } from "types/Icon.type";
import { PageWithImage } from "../common/PageWithImage";
import { DebouncedOracleInput } from "components/shared/DebouncedOracleInput";

export interface OpenLoreProps {
  worldId: string;
  loreId: string;
  lore: LoreDocumentWithGMProperties;
  closeLore: () => void;
  tagList: string[];
}

export function OpenLore(props: OpenLoreProps) {
  const { worldId, loreId, lore, closeLore, tagList } = props;

  const { showGMFields, showGMTips, isGuidedGame } = useWorldPermissions();

  useListenToCurrentLoreDocument(loreId);

  const { error } = useSnackbar();
  const confirm = useConfirm();

  const updateLore = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.updateLore
  );
  const updateLoreGMNotes = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.updateLoreGMNotes
  );
  const deleteLore = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.deleteLore
  );
  const updateLoreNotes = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.updateLoreNotes
  );
  const uploadLoreImage = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.uploadLoreImage
  );
  const removeLoreImage = useStore(
    (store) => store.worlds.currentWorld.currentWorldLore.removeLoreImage
  );

  const handleLoreDelete = () => {
    confirm({
      title: `Delete ${lore.name}`,
      description:
        "Are you sure you want to delete this lore document? It will be deleted from ALL of your characters and campaigns that use this world. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteLore(loreId)
          .catch(() => {})
          .then(() => {
            closeLore();
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
      uploadLoreImage(loreId, file).catch(() => {});
    }
  };

  const icon = mergeIcons(
    {
      key: "GiBookmarklet",
      color: IconColors.White,
    },
    undefined,
    lore.icon
  );

  return (
    <PageWithImage
      imageUrl={lore.imageUrl}
      icon={icon}
      actions={
        <>
          {showGMFields && (
            <Tooltip title={"Delete"}>
              <IconButton onClick={() => handleLoreDelete()}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      }
      name={lore.name}
      nameInput={
        <DebouncedOracleInput
          oracleTableId={""}
          label={"Name"}
          variant={"outlined"}
          color={"primary"}
          initialValue={lore.name}
          updateValue={(newName) =>
            updateLore(loreId, { name: newName }).catch(() => {})
          }
          fullWidth={true}
          sx={{
            mt: 1,
          }}
        />
      }
      handleImageUpload={onFileUpload}
      handleIconSelection={(icon) => {
        if (lore.imageUrl) {
          removeLoreImage(loreId).catch(() => {});
        }
        updateLore(loreId, { icon }).catch(() => {});
      }}
      handleImageRemove={() => removeLoreImage(loreId)}
      handlePageClose={closeLore}
    >
      <Box display={"flex"} flexDirection={"column"}>
        <Box mt={1}>
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={12} lg={6}>
              <LoreTagsAutocomplete
                tagList={tagList}
                tags={lore.tags}
                updateTags={(tags) =>
                  updateLore(loreId, { tags }).catch(() => {})
                }
              />
            </Grid>
            {showGMFields && (
              <>
                {showGMTips && (
                  <Grid item xs={12}>
                    <GuideOnlyHeader breakContainer />
                  </Grid>
                )}
                {isGuidedGame && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    sx={{ alignItems: "center", display: "flex" }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={lore.sharedWithPlayers ?? false}
                          onChange={(evt, value) =>
                            updateLore(loreId, {
                              sharedWithPlayers: value,
                            }).catch(() => {})
                          }
                        />
                      }
                      label="Visible to Players"
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <RtcRichTextEditor
                    id={loreId}
                    roomPrefix={`iron-fellowship-${worldId}-lore-gmnotes-`}
                    documentPassword={worldId}
                    onSave={updateLoreGMNotes}
                    initialValue={lore.gmProperties?.gmNotes}
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
                {!lore.sharedWithPlayers && (
                  <Grid item xs={12}>
                    <Alert severity="warning">
                      These notes are not yet visible to players because this
                      location is hidden from them.
                    </Alert>
                  </Grid>
                )}
                <Grid item xs={12}>
                  {(lore.notes || lore.notes === null) && (
                    <RtcRichTextEditor
                      id={loreId}
                      roomPrefix={`iron-fellowship-${worldId}-lore-`}
                      documentPassword={worldId}
                      onSave={updateLoreNotes}
                      initialValue={lore.notes || undefined}
                    />
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </PageWithImage>
  );
}
