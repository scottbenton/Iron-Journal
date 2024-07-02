import { DataswornTree, IdParser } from "@datasworn/core";
import { ruleset } from "data/rulesets";
import { useEffect } from "react";

export function useSyncRuleset(
  expansionIds?: string[],
  listenForChanges = false
) {
  useEffect(() => {
    // Todo - load expansion ids
    if (ruleset) {
      const dataswornTree = new DataswornTree(ruleset);
      IdParser.datasworn = dataswornTree;
    }
  }, [expansionIds, listenForChanges]);
}
