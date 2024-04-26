import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import {
  StoredMove,
  StoredMoveCategory,
} from "types/homebrew/HomebrewMoves.type";
import PreviewIcon from "@mui/icons-material/Visibility";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { MoveMoveDialog } from "./MoveMoveDialog";
import { useStore } from "stores/store";

export interface MoveCardProps {
  moveId: string;
  move: StoredMove;
  moveCategories: Record<string, StoredMoveCategory>;
  handleEdit: () => void;
  handleDelete: () => void;
  isEditor: boolean;
  dataswornId: string;
}

export function MoveCard(props: MoveCardProps) {
  const {
    moveId,
    move,
    moveCategories,
    handleEdit,
    handleDelete,
    isEditor,
    dataswornId,
  } = props;

  const [moveMoveDialogOpen, setMoveMoveDialogOpen] = useState(false);

  const openDialog = useStore((store) => store.appState.openDialog);

  return (
    <>
      <Card
        variant={"outlined"}
        key={moveId}
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>{move.label}</Typography>
        <Box>
          {isEditor ? (
            <>
              <Tooltip title={"Move Move"}>
                <IconButton onClick={() => setMoveMoveDialogOpen(true)}>
                  <MoveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Edit Move"}>
                <IconButton onClick={() => handleEdit()}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={"Delete Move"}>
                <IconButton onClick={() => handleDelete()}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <Tooltip title={"Preview Move"}>
              <IconButton onClick={() => openDialog(dataswornId, true)}>
                <PreviewIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Card>
      <MoveMoveDialog
        open={moveMoveDialogOpen}
        onClose={() => setMoveMoveDialogOpen(false)}
        moveId={moveId}
        moveCategoryId={move.categoryId}
        categories={moveCategories}
      />
    </>
  );
}
