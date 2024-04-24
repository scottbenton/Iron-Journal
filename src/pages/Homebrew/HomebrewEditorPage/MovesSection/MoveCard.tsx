import { Box, Card, IconButton, Tooltip, Typography } from "@mui/material";
import {
  StoredMove,
  StoredMoveCategory,
} from "types/homebrew/HomebrewMoves.type";
import MoveIcon from "@mui/icons-material/DriveFileMove";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { MoveMoveDialog } from "./MoveMoveDialog";

export interface MoveCardProps {
  moveId: string;
  move: StoredMove;
  moveCategories: Record<string, StoredMoveCategory>;
  handleEdit: () => void;
  handleDelete: () => void;
}

export function MoveCard(props: MoveCardProps) {
  const { moveId, move, moveCategories, handleEdit, handleDelete } = props;

  const [moveMoveDialogOpen, setMoveMoveDialogOpen] = useState(false);

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
