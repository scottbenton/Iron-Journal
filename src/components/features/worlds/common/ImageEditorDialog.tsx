import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { GameIcon } from "components/shared/GameIcons/GameIcon";
import { IconColorSelector } from "components/shared/GameIcons/IconColorSelector";
import { IconSelector } from "components/shared/GameIcons/IconSelector";
import { MAX_FILE_SIZE, MAX_FILE_SIZE_LABEL } from "lib/storage.lib";
import { useSnackbar } from "providers/SnackbarProvider";
import { ChangeEvent, useCallback, useRef, useState } from "react";
import { IconColors, IconDefinition } from "types/Icon.type";

export interface ImageEditorDialogProps {
  name: string;
  imageUrl?: string;
  icon?: IconDefinition;
  open: boolean;
  onClose: () => void;
  handleImageUpload: (image: File) => void;
  handleIconSelection: (icon: IconDefinition) => void;
  handleRemove: () => Promise<void>;
}

export function ImageEditorDialog(props: ImageEditorDialogProps) {
  const {
    name,
    imageUrl,
    icon,
    open,
    onClose,
    handleImageUpload,
    handleIconSelection,
    handleRemove,
  } = props;

  const [openTab, setOpenTab] = useState<"image" | "icon">("image");

  const handleIconKeySelection = useCallback(
    (key: string) => {
      handleIconSelection({
        key,
        color: icon?.color ?? null,
      });
    },
    [handleIconSelection, icon]
  );

  const handleIconColorSelection = useCallback(
    (color: IconColors) => {
      handleIconSelection({ key: icon?.key ?? null, color });
    },
    [handleIconSelection, icon]
  );

  const { error } = useSnackbar();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onFileUpload = (evt: ChangeEvent<HTMLInputElement>) => {
    const files = evt.target.files;
    const file = files?.[0];
    if (file) {
      if (files[0].size > MAX_FILE_SIZE) {
        error(
          `File is too large. The max file size is ${MAX_FILE_SIZE_LABEL}.`
        );
        evt.target.value = "";
        return;
      }
      handleImageUpload(file);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"sm"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Edit {name}&apos;s Image
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Box
          display={"flex"}
          flexDirection={{ xs: "column-reverse", sm: "row" }}
        >
          <Box mr={{ xs: 0, sm: 2 }} mt={{ xs: 2, sm: 0 }} flexGrow={1}>
            <input
              type="file"
              accept={"image/*"}
              hidden
              ref={fileInputRef}
              onChange={onFileUpload}
            />
            <Tabs
              value={openTab}
              onChange={(_, value) =>
                setOpenTab(value === "image" ? "image" : "icon")
              }
            >
              <Tab label={"Image"} value={"image"} />
              <Tab label={"Icon"} value={"icon"} />
            </Tabs>
            {openTab === "image" && (
              <Stack spacing={1} mt={2} alignItems={"flex-start"}>
                <Button
                  variant={"contained"}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {imageUrl ? "Replace Image" : "Upload Image"}
                </Button>
                {imageUrl && (
                  <Button
                    color={"inherit"}
                    onClick={() => handleRemove().catch(() => {})}
                  >
                    Remove Image
                  </Button>
                )}
              </Stack>
            )}
            {openTab === "icon" && (
              <>
                <IconColorSelector
                  selectedColor={icon?.color ?? IconColors.White}
                  setSelectedColor={handleIconColorSelection}
                  sx={{ mt: 1 }}
                />
                <IconSelector
                  setSelectedIcon={handleIconKeySelection}
                  sx={{ mt: 1 }}
                />
              </>
            )}
          </Box>
          <Box flexShrink={0}>
            <Typography variant={"overline"}>Preview</Typography>
            <Box
              width={128}
              height={128}
              color={"#fff"}
              borderRadius={1}
              bgcolor={(theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[900]
                  : theme.palette.background.default
              }
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              border={(theme) => `1px solid ${theme.palette.darkGrey.light}`}
              sx={{
                backgroundImage: `url(${imageUrl})`,
                backgroundPosition: "center top",
                backgroundSize: "cover",
              }}
            >
              {!imageUrl && icon?.key && (
                <GameIcon
                  iconName={icon.key}
                  iconColor={icon.color ?? IconColors.White}
                  sx={{ fontSize: 80 }}
                />
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color={"primary"} variant={"contained"} onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}
