import { Datasworn } from "@datasworn/core";
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { useStore } from "stores/store";
import { ProgressTrackType } from "types/ProgressTrack.type";
import {
  ProgressTrack as IProgressTrack,
  TRACK_SECTION_PROGRESS_TRACKS,
  TRACK_STATUS,
  TRACK_TYPES,
} from "types/Track.type";
import RollIcon from "@mui/icons-material/Casino";
import { useRoller } from "stores/appState/useRoller";

export interface ProgressRollTriggerProps {
  progressInfo: Datasworn.ProgressTrackTypeInfo;
}

export function ProgressRollTrigger(props: ProgressRollTriggerProps) {
  const { progressInfo } = props;

  const characterProgressTracks = useStore(
    (store) =>
      store.characters.currentCharacter.tracks.trackMap[TRACK_STATUS.ACTIVE]
  );
  const campaignProgressTracks = useStore(
    (store) =>
      store.campaigns.currentCampaign.tracks.trackMap[TRACK_STATUS.ACTIVE]
  );

  const isInCampaign = useStore(
    (store) => !!store.campaigns.currentCampaign.currentCampaignId
  );

  const currentCharacterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId
  );

  const npcs = useStore(
    (store) => store.worlds.currentWorld.currentWorldNPCs.npcMap
  );
  const sortedNPCIds = currentCharacterId
    ? Object.keys(npcs)
        .filter((npcId) => {
          const isBonded = npcs[npcId].characterBonds?.[currentCharacterId];
          const bondProgress =
            npcs[npcId].characterBondProgress?.[currentCharacterId];

          return !isBonded && (bondProgress ?? 0) > 4;
        })
        .sort((n1, n2) => {
          const bond1 = npcs[n1].characterBondProgress?.[currentCharacterId];
          const bond2 = npcs[n2].characterBondProgress?.[currentCharacterId];

          return (bond2 ?? 0) - (bond1 ?? 0);
        })
    : [];

  const trackConfigs: Partial<
    Record<
      ProgressTrackType,
      | {
          trackType: TRACK_SECTION_PROGRESS_TRACKS;
          showBothCharacterAndCampaignTracks?: boolean;
          label: string;
        }
      | undefined
    >
  > = {
    [ProgressTrackType.Vow]: {
      showBothCharacterAndCampaignTracks: true,
      trackType: TRACK_TYPES.VOW,
      label: "vow",
    },
    [ProgressTrackType.Combat]: {
      trackType: TRACK_TYPES.FRAY,
      label: "combat",
    },
    [ProgressTrackType.Journey]: {
      trackType: TRACK_TYPES.JOURNEY,
      label: "journey",
    },
    [ProgressTrackType.Expedition]: {
      trackType: TRACK_TYPES.JOURNEY,
      label: "expedition",
    },
  };

  const config = trackConfigs[progressInfo.category as ProgressTrackType];

  const { rollTrackProgress } = useRoller();

  if (config) {
    let tracks: Record<string, IProgressTrack> = {};

    if (isInCampaign) {
      tracks = {
        ...tracks,
        ...campaignProgressTracks[config.trackType],
      };
    }
    if (!isInCampaign || config.showBothCharacterAndCampaignTracks) {
      tracks = {
        ...tracks,
        ...characterProgressTracks[config.trackType],
      };
    }

    const sortedTrackIds = Object.keys(tracks).sort((t1, t2) => {
      return (
        tracks[t1].createdDate.getTime() - tracks[t2].createdDate.getTime()
      );
    });

    return (
      <>
        {sortedTrackIds.length === 0 ? (
          <Typography variant={"body2"}>
            Roll against your {config.label} progress track.
          </Typography>
        ) : (
          <Box component={"ul"} p={0} m={0}>
            {sortedTrackIds.map((trackId) => (
              <Box key={trackId} display={"flex"} alignItems={"center"}>
                <Tooltip title={`Roll ${tracks[trackId].label} Progress`}>
                  <IconButton
                    onClick={() => {
                      rollTrackProgress(
                        config.trackType,
                        tracks[trackId].label || "",
                        Math.min(Math.floor(tracks[trackId].value / 4), 10)
                      );
                    }}
                  >
                    <RollIcon />
                  </IconButton>
                </Tooltip>
                <Typography ml={1}>
                  Roll against {tracks[trackId].label} (
                  {Math.min(Math.floor(tracks[trackId].value / 4), 10)}{" "}
                  progress)
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </>
    );
  }

  if (progressInfo.category === ProgressTrackType.Connection) {
    return (
      <>
        <Typography variant={"body2"}>
          Roll against the bond track you share with the connection.
        </Typography>
        {currentCharacterId && sortedNPCIds.length > 0 ? (
          <Box component={"ul"} p={0} m={0}>
            {sortedNPCIds.map((npcId) => (
              <Box key={npcId} display={"flex"} alignItems={"center"}>
                <Tooltip title={`Roll Bond Progress with ${npcs[npcId].name}`}>
                  <IconButton
                    onClick={() => {
                      rollTrackProgress(
                        TRACK_TYPES.BOND_PROGRESS,
                        npcs[npcId].name || "",
                        Math.min(
                          Math.floor(
                            (npcs[npcId].characterBondProgress?.[
                              currentCharacterId
                            ] ?? 0) / 4
                          ),
                          10
                        )
                      );
                    }}
                  >
                    <RollIcon />
                  </IconButton>
                </Tooltip>
                <Typography ml={1}>
                  Roll against {npcs[npcId].name} (
                  {Math.min(
                    Math.floor(
                      (npcs[npcId].characterBondProgress?.[
                        currentCharacterId
                      ] ?? 0) / 4
                    ),
                    10
                  )}{" "}
                  progress)
                </Typography>
              </Box>
            ))}
          </Box>
        ) : (
          <></>
        )}
      </>
    );
  }

  return <Chip label={progressInfo.category} />;
}
