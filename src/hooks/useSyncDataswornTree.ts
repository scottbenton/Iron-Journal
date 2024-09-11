import { IdParser } from "@datasworn/core";
import { useEffect } from "react";
import { useDataswornTree } from "./useDataswornTree";

export function useSyncDataswornTree() {
  const tree = useDataswornTree();
  useEffect(() => {
    if (tree) {
      IdParser.tree = tree;
    }
  }, [tree]);
}
