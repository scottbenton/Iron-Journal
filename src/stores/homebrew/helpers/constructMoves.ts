import { Datasworn } from "@datasworn/core";
import { HomebrewMoveCategoryDocument } from "api-calls/homebrew/moves/categories/_homebrewMoveCategory.type";
import {
  HomebrewMoveDocument,
  MoveType,
} from "api-calls/homebrew/moves/moves/_homebrewMove.type";

export function constructMoves(
  homebrewId: string,
  moveCategories: Record<string, HomebrewMoveCategoryDocument>,
  moves: Record<string, HomebrewMoveDocument>
): Record<string, Datasworn.MoveCategory> {
  const categories: Record<string, Datasworn.MoveCategory> = {};

  Object.entries(moveCategories)
    .sort(([, mc1], [, mc2]) => {
      return mc1.label.localeCompare(mc2.label);
    })
    .forEach(([categoryId, moveCategory]) => {
      categories[categoryId] = {
        _id: `move_category:${homebrewId}/${categoryId}`,
        type: "move_category",
        name: moveCategory.label,
        _source: DEFAULT_SOURCE,
        description: moveCategory.description,
        enhances: moveCategory.enhancesId
          ? [moveCategory.enhancesId]
          : undefined,
        replaces: moveCategory.replacesId
          ? [moveCategory.replacesId]
          : undefined,
        contents: {},
        collections: {},
      };
    });

  Object.entries(moves)
    .sort(([, m1], [, m2]) => {
      return m1.label.localeCompare(m2.label);
    })
    .forEach(([moveId, move]) => {
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
  // TODO - add oracles
  if (move.type === MoveType.NoRoll) {
    const m: Datasworn.MoveNoRoll = {
      _id: `move:${homebrewId}/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ? [move.replacesId] : undefined,
      roll_type: "no_roll",
      _source: DEFAULT_SOURCE,
      trigger: {
        text: "",
        conditions: [],
      },
      outcomes: null,
      allow_momentum_burn: false,
    };
    return m;
  } else if (move.type === MoveType.ActionRoll) {
    const m: Datasworn.MoveActionRoll = {
      _id: `move:${homebrewId}/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ? [move.replacesId] : undefined,
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
      //   oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
      allow_momentum_burn: true,
    };
    return m;
  } else if (move.type === MoveType.ProgressRoll) {
    const m: Datasworn.MoveProgressRoll = {
      _id: `move:${homebrewId}/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ? [move.replacesId] : undefined,
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
      //   oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
      allow_momentum_burn: false,
    };
    return m;
  } else {
    const m: Datasworn.MoveSpecialTrack = {
      _id: `move:${homebrewId}/${move.categoryId}/${moveId}`,
      type: "move",
      name: move.label,
      text: move.text,
      replaces: move.replacesId ? [move.replacesId] : undefined,
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
      //   oracles: move.oracles,
      outcomes: {
        strong_hit: { text: "" },
        weak_hit: { text: "" },
        miss: { text: "" },
      },
      allow_momentum_burn: false,
    };
    return m;
  }
}

const DEFAULT_SOURCE: Datasworn.SourceInfo = {
  title: "Homebrew Content",
  authors: [],
  date: "2000-01-01",
  url: "",
  license: null,
};
