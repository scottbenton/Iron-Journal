import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { EmptyState } from "components/shared/EmptyState";
import { SectionHeading } from "components/shared/SectionHeading";
import { useState } from "react";
import {
  StoredMove,
  StoredMoveCategory,
} from "types/homebrew/HomebrewMoves.type";
import { MoveCategoryCard } from "./MoveCategoryCard";
import { MoveCategoryDialog } from "./MoveCategoryDialog";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { MoveDialog } from "./MoveDialog";
import { useStore } from "stores/store";
import { useConfirm } from "material-ui-confirm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export interface MovesEditorPaneProps {
  homebrewId: string;
  categories: Record<string, StoredMoveCategory>;
  moves: Record<string, StoredMove>;
}

export function MovesEditorPane(props: MovesEditorPaneProps) {
  const { homebrewId, categories, moves } = props;

  const [categoryDialogState, setCategoryDialogState] = useState<{
    open: boolean;
    openCategoryId?: string;
  }>({ open: false });
  const [moveDialogState, setMoveDialogState] = useState<{
    open: boolean;
    openMoveId?: string;
  }>({ open: false });

  const [openMoveCategoryId, setOpenMoveCategoryId] = useState<string>();
  const openMoveCategory = openMoveCategoryId
    ? categories[openMoveCategoryId]
    : undefined;

  const sortedCategoryIds = Object.keys(categories).sort((c1, c2) =>
    categories[c1].label.localeCompare(categories[c2].label)
  );
  const sortedMoveIds = openMoveCategoryId
    ? Object.keys(moves)
        .filter((id) => moves[id].categoryId === openMoveCategoryId)
        .sort((k1, k2) => moves[k1].label.localeCompare(moves[k2].label))
    : [];

  const confirm = useConfirm();

  const deleteMoveCategory = useStore(
    (store) => store.homebrew.deleteMoveCategory
  );
  const handleDeleteMoveCategory = (
    categoryName: string,
    categoryId: string
  ) => {
    confirm({
      title: `Delete ${categoryName}`,
      description:
        "Are you sure you want to delete this move category? This will also delete the moves under this category. This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        setOpenMoveCategoryId(undefined);
        deleteMoveCategory(homebrewId, categoryId).catch(() => {});
      })
      .catch(() => {});
  };
  const deleteMove = useStore((store) => store.homebrew.deleteMove);
  const handleDeleteMove = (moveName: string, moveId: string) => {
    confirm({
      title: `Delete ${moveName}`,
      description:
        "Are you sure you want to delete this move? This cannot be undone.",
      confirmationText: "Delete",
      confirmationButtonProps: {
        variant: "contained",
        color: "error",
      },
    })
      .then(() => {
        deleteMove(moveId).catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <>
      <Stack spacing={2}>
        {openMoveCategory && openMoveCategoryId ? (
          <>
            <Breadcrumbs>
              <Link
                component={"button"}
                underline="hover"
                color="inherit"
                sx={{ lineHeight: "1rem" }}
                onClick={() => setOpenMoveCategoryId(undefined)}
              >
                Move Categories
              </Link>
              <Typography color="text.primary">
                {openMoveCategory.label}
              </Typography>
            </Breadcrumbs>
            <SectionHeading
              label={"Category Info"}
              floating
              action={
                <>
                  <Button
                    color={"error"}
                    onClick={() =>
                      handleDeleteMoveCategory(
                        openMoveCategory.label,
                        openMoveCategoryId
                      )
                    }
                  >
                    Delete Category
                  </Button>
                  <Button
                    color={"inherit"}
                    variant={"outlined"}
                    onClick={() =>
                      setCategoryDialogState({
                        open: true,
                        openCategoryId: openMoveCategoryId,
                      })
                    }
                  >
                    Edit Category
                  </Button>
                </>
              }
            />
            {openMoveCategory.description && (
              <MarkdownRenderer markdown={openMoveCategory.description} />
            )}
            <SectionHeading
              label={"Category Moves"}
              floating
              action={
                <Button
                  color={"inherit"}
                  onClick={() =>
                    setMoveDialogState({
                      open: true,
                    })
                  }
                >
                  Create Move
                </Button>
              }
            />
            {sortedMoveIds.length > 0 ? (
              <>
                {sortedMoveIds.map((moveId) => (
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
                    <Typography>{moves[moveId].label}</Typography>
                    <Box>
                      <IconButton
                        onClick={() =>
                          setMoveDialogState({ open: true, openMoveId: moveId })
                        }
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        onClick={() =>
                          handleDeleteMove(moves[moveId].label, moveId)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Card>
                ))}
              </>
            ) : (
              <EmptyState
                message="Add a move to get started"
                callToAction={
                  <Button
                    color={"inherit"}
                    variant={"outlined"}
                    onClick={() =>
                      setMoveDialogState({
                        open: true,
                      })
                    }
                  >
                    Create Move
                  </Button>
                }
              />
            )}
          </>
        ) : (
          <>
            <SectionHeading
              label={"Move Categories"}
              floating
              action={
                <Button
                  color={"inherit"}
                  onClick={() => setCategoryDialogState({ open: true })}
                >
                  Create Category
                </Button>
              }
            />
            {sortedCategoryIds.length === 0 && (
              <EmptyState
                message="Add a move category to group your moves together"
                callToAction={
                  <Button
                    variant="outlined"
                    color={"inherit"}
                    onClick={() => setCategoryDialogState({ open: true })}
                  >
                    Create Category
                  </Button>
                }
              />
            )}
            {sortedCategoryIds.map((id) => (
              <MoveCategoryCard
                key={id}
                category={categories[id]}
                onClick={() =>
                  categories[id] ? setOpenMoveCategoryId(id) : {}
                }
              />
            ))}
          </>
        )}
      </Stack>
      <MoveCategoryDialog
        homebrewId={homebrewId}
        open={categoryDialogState.open}
        existingMoveCategoryId={categoryDialogState.openCategoryId}
        onClose={() =>
          setCategoryDialogState((prev) => ({ ...prev, open: false }))
        }
      />
      {openMoveCategoryId && (
        <MoveDialog
          open={moveDialogState.open}
          onClose={() =>
            setMoveDialogState((prev) => ({ ...prev, open: false }))
          }
          existingMoveId={moveDialogState.openMoveId}
          categoryId={openMoveCategoryId}
          homebrewId={homebrewId}
        />
      )}
    </>
  );
}
