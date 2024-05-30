import {
  Card,
  Checkbox,
  Chip,
  FormControlLabel,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { useSnackbar } from "providers/SnackbarProvider";
import { ProgressTrack } from "../ProgressTrack";
import { Difficulty, TrackTypes } from "types/Track.type";
import { useStore } from "stores/store";
import { NPC } from "types/NPCs.type";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface BondsSectionProps {
  isStarforged: boolean;
  difficulty?: Difficulty;

  isBonded: boolean;
  bondProgress?: number;
  onBondToggle?: (bonded: boolean) => void;
  updateBondProgressValue?: (value: number) => void;

  hasConnection: boolean;
  onConnectionToggle?: (connected: boolean) => void;

  disableToggle?: boolean;
  inheritedBondName?: string;

  npc?: NPC;
  location?: LocationWithGMProperties;
}

export function BondsSection(props: BondsSectionProps) {
  const {
    isStarforged,
    difficulty,
    isBonded,
    onBondToggle,
    updateBondProgressValue,
    bondProgress,
    hasConnection,
    onConnectionToggle,

    disableToggle,
    inheritedBondName,
    npc,
    location,
  } = props;

  const { info } = useSnackbar();

  const npcLocationBonds = location?.characterBonds ?? {};
  const npcBonds = npc?.characterBonds ?? {};
  const npcConnections = npc?.characterConnections ?? {};

  const currentCampaignCharacters = useStore(
    (store) => store.campaigns.currentCampaign.characters.characterMap
  );
  const bondedCharacterNames = Object.keys(currentCampaignCharacters)
    .filter(
      (characterId) => npcLocationBonds[characterId] || npcBonds[characterId]
    )
    .map((characterId) => currentCampaignCharacters[characterId]?.name ?? "");

  const connectedCharacterIds = Object.keys(currentCampaignCharacters).filter(
    (characterId) =>
      npcConnections[characterId] &&
      !(npcBonds[characterId] || npcLocationBonds[characterId])
  );

  return (
    <>
      {(onBondToggle || (onConnectionToggle && isStarforged)) && (
        <Grid item xs={12}>
          <Stack spacing={0.5} direction={"row"} flexWrap={"wrap"}>
            {inheritedBondName && (
              <FormControlLabel
                control={<Checkbox disabled={true} checked={true} />}
                label={`Bonded via ${inheritedBondName}`}
              />
            )}
            {onBondToggle && (
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={disableToggle}
                    checked={isBonded ?? false}
                    onChange={(evt, value) => {
                      onBondToggle(value);
                      info(
                        "Don't forget to update your Bonds track on the Tracks Tab"
                      );
                    }}
                  />
                }
                label={"Bonded"}
              />
            )}
            {isStarforged && onConnectionToggle && (
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={disableToggle}
                    checked={hasConnection ?? false}
                    onChange={(evt, value) => {
                      onConnectionToggle(value);
                    }}
                  />
                }
                label={"Connected"}
                sx={{ ml: 2 }}
              />
            )}
          </Stack>
        </Grid>
      )}
      {!isBonded &&
        hasConnection &&
        updateBondProgressValue &&
        bondProgress !== undefined &&
        isStarforged && (
          <Grid item xs={12}>
            <ProgressTrack
              label={"Bond Progress"}
              max={40}
              value={bondProgress}
              onValueChange={(value) => updateBondProgressValue(value)}
              difficulty={difficulty}
              trackType={TrackTypes.BondProgress}
              hideDifficultyLabel
            />
          </Grid>
        )}
      {bondedCharacterNames && bondedCharacterNames.length > 0 && (
        <Grid item xs={12}>
          <Typography variant={"caption"} color={"textSecondary"}>
            Bonded Characters
          </Typography>
          <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
            {bondedCharacterNames.map((characterName, index) => (
              <Chip key={index} variant={"outlined"} label={characterName} />
            ))}
          </Stack>
        </Grid>
      )}
      {connectedCharacterIds &&
        connectedCharacterIds.length > 0 &&
        isStarforged && (
          <Grid item xs={12}>
            <Card variant="outlined" sx={{ p: 2, pt: 1 }}>
              <Typography variant={"caption"} color={"textSecondary"}>
                Connected Characters
              </Typography>
              <Stack spacing={2} flexWrap={"wrap"} mt={1}>
                {connectedCharacterIds.map((characterId) => (
                  <ProgressTrack
                    key={characterId}
                    label={`${currentCampaignCharacters[characterId].name} Bond Progress`}
                    max={40}
                    value={npc?.characterBondProgress?.[characterId] ?? 0}
                    difficulty={difficulty}
                    trackType={TrackTypes.BondProgress}
                    hideDifficultyLabel
                    hideRollButton
                  />
                ))}
              </Stack>
            </Card>
          </Grid>
        )}
    </>
  );
}
