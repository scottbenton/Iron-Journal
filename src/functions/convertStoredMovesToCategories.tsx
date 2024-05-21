import { Datasworn } from "@datasworn/core";
import { License } from "types/Datasworn";
import {
  MoveType,
  HomebrewMoveDocument,
} from "api-calls/homebrew/moves/moves/_homebrewMove.type";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";

const DEFAULT_SOURCE: Datasworn.SourceInfo = {
  title: "Homebrew Content",
  authors: [],
  date: "2000-01-01",
  url: "",
  license: License.None,
};

export function convertStoredMovesToCategories(
  homebrewId: string,
  storedCategories: Record<string, HomebrewMoveCategoryDocument>,
  storedMoves: Record<string, HomebrewMoveDocument>
): Record<string, Datasworn.MoveCategory> {
  const categories: Record<string, Datasworn.MoveCategory> = {};

  Object.keys(storedCategories)
    .sort((c1, c2) =>
      storedCategories[c1].label.localeCompare(storedCategories[c2].label)
    )
    .forEach((categoryId) => {
      const storedCategory = storedCategories[categoryId];
      categories[categoryId] = {
        _id: `${homebrewId}/collections/moves/${categoryId}`,
        type: "move_category",
        name: storedCategory.label,
        _source: DEFAULT_SOURCE,
        description: storedCategory.description,
        enhances: storedCategory.enhancesId ?? undefined,
        replaces: storedCategory.replacesId ?? undefined,
        contents: {},
      };
    });

  Object.keys(storedMoves)
    .sort((m1, m2) =>
      storedMoves[m1].label.localeCompare(storedMoves[m2].label)
    )
    .forEach((moveId) => {
      const move = storedMoves[moveId];

      const convertedMove = convertStoredMove(homebrewId, moveId, move);

      const moveCategory = categories[move.categoryId];

      if (!moveCategory.contents) {
        moveCategory.contents = { [moveId]: convertedMove };
      } else {
        moveCategory.contents[moveId] = convertedMove;
      }
    });

  return categories;
}

function convertStoredMove(
  homebrewId: string,
  moveId: string,
  move: HomebrewMoveDocument
): Datasworn.Move {
  if (move.type === MoveType.NoRoll) {
    const m: Datasworn.MoveNoRoll = {
      _id: `${homebrewId}/moves/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ?? undefined,
      roll_type: "no_roll",
      _source: DEFAULT_SOURCE,
      trigger: {
        text: "",
        conditions: [],
      },
      outcomes: null,
      oracles: move.oracles,
    };
    return m;
  } else if (move.type === MoveType.ActionRoll) {
    const m: Datasworn.MoveActionRoll = {
      _id: `${homebrewId}/moves/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ?? undefined,
      roll_type: "action_roll",
      _source: DEFAULT_SOURCE,
      trigger: {
        text: "",
        conditions: [
          {
            method: "player_choice",
            roll_options: (move.stats ?? []).map((stat) => ({
              using: "stat",
              stat,
            })),
          },
          {
            method: "player_choice",
            roll_options: (move.conditionMeters ?? []).map(
              (conditionMeter) => ({
                using: "condition_meter",
                condition_meter: conditionMeter,
              })
            ),
          },
          {
            method: "player_choice",
            roll_options: (move.assetControls ?? []).map((control) => ({
              using: "asset_control",
              control,
              assets: ["*"],
            })),
          },
        ],
      },
      oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
    };
    return m;
  } else if (move.type === MoveType.ProgressRoll) {
    const m: Datasworn.MoveProgressRoll = {
      _id: `${homebrewId}/moves/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ?? undefined,
      roll_type: "progress_roll",
      _source: DEFAULT_SOURCE,
      trigger: {
        text: "",
        conditions: [
          {
            method: "progress_roll",
            roll_options: [
              {
                using: "progress_track",
              },
            ],
          },
        ],
      },
      tracks: {
        category: move.category,
      },
      oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
    };
    return m;
  } else {
    const m: Datasworn.MoveSpecialTrack = {
      _id: `${homebrewId}/moves/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ?? undefined,
      roll_type: "special_track",
      _source: DEFAULT_SOURCE,
      trigger: {
        text: "",
        conditions: [
          {
            method: "all",
            roll_options: move.specialTracks.map((specialTrack) => ({
              using: specialTrack,
            })),
          },
        ],
      },
      oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
    };
    return m;
  }
}
