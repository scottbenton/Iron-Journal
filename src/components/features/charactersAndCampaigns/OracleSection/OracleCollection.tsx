import { Datasworn } from "@datasworn/core";
import { useMemo, useState } from "react";
import { CollapsibleSectionHeader } from "../CollapsibleSectionHeader";
import { Collapse, List } from "@mui/material";
import { OracleSelectableRollableCollectionListItem } from "./OracleSelectableRollableCollectionListItem";
import { OracleListItem } from "./OracleListItem";
import {
  CATEGORY_VISIBILITY,
  CombinedCollectionType,
} from "./useFilterOracles";

export interface OracleCollectionProps {
  collectionId: string;
  collections: Record<string, CombinedCollectionType>;
  oracles: Record<string, Datasworn.OracleRollable>;
  forceOpen?: boolean;
  visibleCollections: Record<string, CATEGORY_VISIBILITY>;
  visibleOracles: Record<string, boolean>;
  enhancesCollections: Record<string, string[]>;
  disabled?: boolean;
}

export function OracleCollection(props: OracleCollectionProps) {
  const {
    collectionId,
    collections,
    oracles,
    forceOpen,
    visibleCollections,
    visibleOracles,
    enhancesCollections,
    disabled,
  } = props;

  const [isExpanded, setIsExpanded] = useState(false);
  const isExpandedOrForced = isExpanded || forceOpen;

  const collection = collections[collectionId];

  const contents = collection.contents;
  const subCollections =
    collection.oracle_type === "tables" && collection.collections;

  const enhancingCollectionIds = enhancesCollections[collectionId];

  const { oracleIds, subCollectionIds } = useMemo(() => {
    const oracleIds = Object.values(contents ?? {}).map((oracle) => oracle._id);

    const subCollectionIds = Object.values(subCollections || {}).map(
      (subCollection) => subCollection._id
    );

    (enhancingCollectionIds ?? []).forEach((enhancesId) => {
      const enhancingCollection = collections[enhancesId];
      if (enhancingCollection) {
        oracleIds.push(
          ...Object.values(enhancingCollection.contents ?? {}).map(
            (oracle) => oracle._id
          )
        );
        if (enhancingCollection.oracle_type === "tables") {
          subCollectionIds.push(
            ...Object.values(enhancingCollection.collections ?? {}).map(
              (subCollection) => subCollection._id
            )
          );
        }
      }
    });

    return { oracleIds, subCollectionIds };
  }, [contents, subCollections, collections, enhancingCollectionIds]);

  if (
    visibleCollections[collectionId] === CATEGORY_VISIBILITY.HIDDEN ||
    !collection
  ) {
    return null;
  } else if (
    collection.oracle_type === "table_shared_text" ||
    collection.oracle_type === "table_shared_text2" ||
    collection.oracle_type === "table_shared_text3"
  ) {
    return (
      <OracleSelectableRollableCollectionListItem
        collection={collection}
        disabled={disabled}
      />
    );
  }

  return (
    <>
      <CollapsibleSectionHeader
        open={isExpanded}
        forcedOpen={forceOpen}
        toggleOpen={() => !forceOpen && setIsExpanded((prev) => !prev)}
        text={collection.name}
        disabled={disabled}
      />
      <Collapse in={isExpandedOrForced}>
        <List sx={{ py: 0, mb: isExpandedOrForced ? 0.5 : 0 }}>
          {oracleIds.map((oracleId) => (
            <OracleListItem
              key={collectionId + "-" + oracleId}
              oracleId={oracleId}
              oracles={oracles}
              disabled={!isExpandedOrForced || disabled}
              visibleOracles={visibleOracles}
              collectionVisibility={visibleCollections[collection._id]}
            />
          ))}
          {subCollectionIds.map((subCollectionId) => (
            <OracleCollection
              key={collectionId + "-" + subCollectionId}
              collectionId={subCollectionId}
              collections={collections}
              oracles={oracles}
              forceOpen={forceOpen}
              visibleCollections={visibleCollections}
              visibleOracles={visibleOracles}
              enhancesCollections={enhancesCollections}
              disabled={disabled || !isExpandedOrForced}
            />
          ))}
        </List>
      </Collapse>
    </>
  );
}
