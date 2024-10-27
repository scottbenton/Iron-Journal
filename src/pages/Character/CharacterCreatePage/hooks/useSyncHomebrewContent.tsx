import { UseFormWatch } from "react-hook-form";
import { Form } from "../CharacterCreatePageContent";
import { useStore } from "stores/store";
import { useListenToHomebrewContent } from "stores/homebrew/useListenToHomebrewContent";
import { useMemo } from "react";
import { ExpansionOptions } from "types/ExpansionOptions.type";

export function useSyncHomebrewContent(
  watch: UseFormWatch<Form>,
  campaignId?: string
) {
  const expansionMap = watch("expansionMap");

  const expansions = useMemo(
    () =>
      Object.keys(expansionMap ?? {}).filter(
        (expansionId) =>
          expansionMap[expansionId] === ExpansionOptions.ENABLED ||
          expansionMap[expansionId] === ExpansionOptions.COMPATIBILITY
      ),
    [expansionMap]
  );
  const compatibilityExpansions = useMemo(
    () =>
      Object.keys(expansionMap ?? {}).filter(
        (expansionId) => expansionMap[expansionId] === ExpansionOptions.COMPATIBILITY
      ),
    [expansionMap]
  );
  const campaignExpansions = useStore((store) =>
    campaignId
      ? store.campaigns.campaignMap[campaignId]?.expansionIds
      : undefined
  );
  const campaignCompatibilityExpansions = useStore((store) =>
    campaignId
      ? store.campaigns.campaignMap[campaignId]?.compatibilityExpansionIds
      : undefined
  );

  const expansionIds = (campaignId ? campaignExpansions : expansions) ?? [];
  const compatibilityIds = (campaignId ? campaignCompatibilityExpansions : compatibilityExpansions) ?? [];
  useListenToHomebrewContent(expansionIds, compatibilityIds);
}
