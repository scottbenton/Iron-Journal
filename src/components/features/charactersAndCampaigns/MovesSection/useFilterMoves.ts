import { getMoveCategories, getMoves } from "data/datasworn";
import { useMemo, useState } from "react";

export enum CATEGORY_VISIBILITY {
  HIDDEN,
  SOME,
  ALL,
}

export function useFilterMoves() {
  const [search, setSearch] = useState("");

  const moveCategories = getMoveCategories();
  const moveMap = getMoves();

  const { visibleMoveCategoryIds, visibleMoveIds, isEmpty } = useMemo(() => {
    const visibleCategories: Record<string, CATEGORY_VISIBILITY> = {};
    const visibleMoves: Record<string, boolean> = {};
    let isEmpty: boolean = true;

    Object.values(moveCategories).forEach((category) => {
      if (
        !search ||
        (category.name
          .toLocaleLowerCase()
          .includes(search.toLocaleLowerCase()) &&
          Object.keys(category.contents ?? {}).length > 0)
      ) {
        visibleCategories[category._id] = CATEGORY_VISIBILITY.ALL;
        isEmpty = false;
        return;
      }

      let hasMove = false;

      const contents = category.contents;
      if (contents) {
        Object.keys(contents).forEach((moveId) => {
          const move = contents[moveId];

          if (
            move.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          ) {
            hasMove = true;
            visibleMoves[move._id] = true;
          }
        });
      }
      if (hasMove) {
        isEmpty = false;
        visibleCategories[category._id] = CATEGORY_VISIBILITY.SOME;
        if (category.enhances) {
          visibleCategories[category.enhances] = CATEGORY_VISIBILITY.SOME;
        }
      } else {
        visibleCategories[category._id] = CATEGORY_VISIBILITY.HIDDEN;
      }
    });

    return {
      visibleMoveCategoryIds: visibleCategories,
      visibleMoveIds: visibleMoves,
      isEmpty,
    };
  }, [moveCategories, search]);

  return {
    moveCategories,
    moveMap,
    setSearch,
    visibleMoveCategoryIds,
    visibleMoveIds,
    isSearchActive: !!search,
    isEmpty,
  };
}
