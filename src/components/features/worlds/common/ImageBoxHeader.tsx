import {
  Box,
  Hidden,
  IconButton,
  Stack,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RoundedImageUploader } from "../NPCSection/RoundedImageUploader";
import { ReactNode, useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";

export interface ImageBoxHeaderProps {
  imageUrl?: string;
  name: string;
  rounded?: boolean;
  uploadImage: (file: File) => Promise<void>;
  removeImage: () => Promise<void>;
  nameInput: ReactNode;
  actions: ReactNode;
  closeItem: () => void;
}
export function ImageBoxHeader(props: ImageBoxHeaderProps) {
  const {
    imageUrl,
    name,
    rounded,
    uploadImage,
    removeImage,
    nameInput,
    actions,
    closeItem,
  } = props;

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up("lg"));

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <Box
        display={"flex"}
        alignItems={"flex-start"}
        sx={{
          px: { xs: 2, sm: 3 },
        }}
        mb={isLg ? -8 : -4}
      >
        <RoundedImageUploader
          src={imageUrl}
          title={name}
          handleFileUpload={(file) => uploadImage(file).catch(() => {})}
          handleUploadClick={() => fileInputRef.current?.click()}
          ref={fileInputRef}
          removeImage={() => removeImage()}
          squared={!rounded}
        />
        <Box
          justifyContent={isLg ? "space-between" : "flex-end"}
          flexGrow={1}
          display={"flex"}
          alignItems={"flex-start"}
          py={1}
          pl={2}
        >
          <Hidden lgDown>{nameInput} </Hidden>
          <Stack direction={"row"} mt={1}>
            {actions}

            <Tooltip title={"Close"}>
              <IconButton onClick={closeItem}>
                <CloseIcon />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 1,
          px: { xs: 2, sm: 3 },
          pb: 1,
        }}
      >
        <Hidden lgUp>{nameInput}</Hidden>
      </Box>
    </>
  );
}
