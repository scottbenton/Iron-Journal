import {
  Box,
  Button,
  Card,
  CardActionArea,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { World } from "types/World.type";
import { EmptyState } from "../../shared/EmptyState/EmptyState";
import { useStore } from "stores/store";
import { useGameSystem } from "hooks/useGameSystem";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { useCampaignType } from "hooks/useCampaignType";

export interface WorldEmptyStateProps {
  worldsToChooseFrom?: World[];
  onChooseWorld?: (index: number) => void;
  worldUpdateLoading?: boolean;
  isOnWorldTab?: boolean;
}

export function WorldEmptyState(props: WorldEmptyStateProps) {
  const {
    worldsToChooseFrom,
    onChooseWorld,
    worldUpdateLoading,
    isOnWorldTab,
  } = props;

  const characterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId
  );
  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );
  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId
  );
  const updateCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const { showGuidedPlayerView } = useCampaignType();

  const createWorld = useStore((store) => store.worlds.createWorld);
  const handleWorldCreate = () => {
    createWorld()
      .then((worldId) => {
        console.debug(campaignId, characterId, worldId);
        if (campaignId) {
          updateCampaign({ worldId }).catch(() => {});
        } else if (characterId) {
          updateCharacter({ worldId }).catch(() => {});
        }
      })
      .catch(() => {});
  };

  const isStarforged = useGameSystem().gameSystem === GAME_SYSTEMS.STARFORGED;

  return (
    <>
      {worldsToChooseFrom && onChooseWorld && worldsToChooseFrom.length > 0 ? (
        <Stack spacing={2} sx={{ p: 2 }}>
          <Typography
            sx={{ mb: 1 }}
            color={(theme) => theme.palette.text.secondary}
          >
            Add an existing world
          </Typography>

          {worldsToChooseFrom.map((world, index) => (
            <Card variant={"outlined"} key={world.name}>
              <CardActionArea
                onClick={() => onChooseWorld(index)}
                sx={{ p: 2 }}
                disabled={worldUpdateLoading}
              >
                {world.name}
              </CardActionArea>
            </Card>
          ))}
          <Divider sx={{ my: 3 }}>OR</Divider>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Button
              variant={"contained"}
              onClick={handleWorldCreate}
              disabled={worldUpdateLoading}
            >
              Create a new World
            </Button>
          </Box>
        </Stack>
      ) : (
        <EmptyState
          showImage
          title={"No World Found"}
          message={
            showGuidedPlayerView
              ? "No world found. Only your GM can add a world to this campaign."
              : `Worlds allow you to share ${
                  isStarforged ? "sectors" : "locations"
                }, npcs, lore, and world truths across different campaigns and characters. ${
                  !isOnWorldTab ? `You can add a world from the world tab.` : ""
                }`
          }
          callToAction={
            isOnWorldTab &&
            !showGuidedPlayerView && (
              <Button
                variant={"contained"}
                color={"primary"}
                onClick={handleWorldCreate}
              >
                Create a World
              </Button>
            )
          }
        />
      )}
    </>
  );
}
