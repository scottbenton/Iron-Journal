import { Box, IconButton, Stack, Tooltip } from "@mui/material";
import React, { PropsWithChildren, useState } from "react";
import { ImageOutlineBackground } from "./ImageOutlineBackground";
import { HeaderImage } from "./HeaderImage";
import { ImageViewerDialog } from "./ImageViewerDialog";
import CloseIcon from "@mui/icons-material/Close";
import UploadIcon from "@mui/icons-material/AddPhotoAlternate";
import { ImageEditorDialog } from "./ImageEditorDialog";
import { IconDefinition } from "types/Icon.type";

export interface PageWithImageProps {
  imageUrl?: string;
  icon?: IconDefinition;
  actions?: React.ReactNode;
  name: string;
  nameInput: React.ReactNode;

  handleImageUpload: (image: File) => void;
  handleIconSelection: (icon: IconDefinition) => void;
  handleImageRemove: () => Promise<void>;
  handlePageClose: () => void;
}

export function PageWithImage(props: PropsWithChildren<PageWithImageProps>) {
  const {
    imageUrl,
    icon,
    actions,
    name,
    nameInput,
    handleImageUpload,
    handleIconSelection,
    handleImageRemove,
    handlePageClose,
    children,
  } = props;

  const hasImage = !!imageUrl || !!icon;

  const [viewImageDialogOpen, setViewImageDialogOpen] = useState(false);
  const [editImageDialogOpen, setEditImageDialogOpen] = useState(false);

  return (
    <>
      <Box
        overflow={"auto"}
        flexGrow={1}
        height={"100%"}
        display={"flex"}
        flexDirection={"column"}
      >
        {imageUrl && <ImageOutlineBackground />}

        <Box
          sx={(theme) => ({
            bgcolor: theme.palette.background.paper,
            borderTop: imageUrl
              ? `1px solid ${theme.palette.divider}`
              : undefined,
            borderLeft: `1px solid ${theme.palette.divider}`,
            zIndex: 1,
            position: "relative",
            flexGrow: 1,
          })}
        >
          <Box mt={1} px={{ xs: 2, md: 3 }}>
            <Box
              display={"flex"}
              alignItems={imageUrl ? "flex-start" : "center"}
              mb={imageUrl ? { xs: -4, lg: -8 } : 0}
            >
              {hasImage && (
                <HeaderImage
                  imageSrc={imageUrl}
                  icon={icon}
                  handleClick={() => imageUrl && setViewImageDialogOpen(true)}
                />
              )}
              <Box
                justifyContent={{ xs: "flex-end", lg: "space-between" }}
                flexGrow={1}
                display={"flex"}
                alignItems={"flex-start"}
                py={1}
                pl={hasImage ? 2 : 0}
              >
                <Box display={{ xs: "none", lg: "block" }}>{nameInput}</Box>
                <Stack direction={"row"} mt={1}>
                  <Tooltip title={hasImage ? "Change Image" : "Add Image"}>
                    <IconButton onClick={() => setEditImageDialogOpen(true)}>
                      <UploadIcon />
                    </IconButton>
                  </Tooltip>
                  {actions}
                  <Tooltip title={"Close"}>
                    <IconButton onClick={handlePageClose}>
                      <CloseIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Box>
            </Box>
            <Box mt={1} pb={1} display={{ xs: "block", lg: "none" }}>
              {nameInput}
            </Box>
            {children}
          </Box>
        </Box>
      </Box>
      {imageUrl && (
        <ImageViewerDialog
          open={viewImageDialogOpen}
          onClose={() => setViewImageDialogOpen(false)}
          name={name}
          imageUrl={imageUrl}
          handleEditClick={() => {
            setEditImageDialogOpen(true);
            setViewImageDialogOpen(false);
          }}
        />
      )}
      <ImageEditorDialog
        open={editImageDialogOpen}
        onClose={() => setEditImageDialogOpen(false)}
        name={name}
        imageUrl={imageUrl}
        icon={icon}
        handleRemove={handleImageRemove}
        handleImageUpload={handleImageUpload}
        handleIconSelection={handleIconSelection}
      />
    </>
  );
}
