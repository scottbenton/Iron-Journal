import { Datasworn } from "@datasworn/core";
import { RulesSliceData } from "../rules.slice.type";

export function parseMovesIntoMaps(
  moveCategories: Record<string, Datasworn.MoveCategory>,
  sort?: boolean
): RulesSliceData["moveMaps"] {
  const moveCategoryMap: Record<string, Datasworn.MoveCategory> = {};
  const nonReplacedMoveCategoryMap: Record<string, Datasworn.MoveCategory> = {};
  const moveMap: Record<string, Datasworn.Move> = {};
  const nonReplacedMoveMap: Record<string, Datasworn.Move> = {};

  const sortedCategories = sort
    ? Object.values(moveCategories).sort((a, b) => a.name.localeCompare(b.name))
    : Object.values(moveCategories);

  sortedCategories.forEach((category) => {
    if (category.contents) {
      if (category.replaces) {
        // Todo - fix replaces with new replaces logic
        // moveCategoryMap[category.replaces] = category;
      } else {
        moveCategoryMap[category._id] = category;
      }
      nonReplacedMoveCategoryMap[category._id] = category;

      const sortedContents = sort
        ? Object.values(category.contents).sort((a, b) =>
            a.name.localeCompare(b.name)
          )
        : Object.values(category.contents);

      sortedContents.forEach((move) => {
        if (move.replaces) {
          // Todo - fix replaces with new replaces logic
          // moveMap[move.replaces] = move;
        }
        moveMap[move._id] = move;
        nonReplacedMoveMap[move._id] = move;
      });
    }
  });

  return {
    moveCategoryMap,
    nonReplacedMoveCategoryMap,
    moveMap,
    nonReplacedMoveMap,
  };
}
