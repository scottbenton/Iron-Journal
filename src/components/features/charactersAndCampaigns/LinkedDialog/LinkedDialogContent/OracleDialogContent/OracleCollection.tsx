import { Datasworn } from "@datasworn/core";
import { OracleCollection as OracleCollectionRenderer } from "components/features/charactersAndCampaigns/OracleSection/OracleCollection";
import { CATEGORY_VISIBILITY } from "components/features/charactersAndCampaigns/OracleSection/useFilterOracles";
import { getOracleCollections, getOracleRollables } from "data/datasworn";

export interface OracleCollectionProps {
  collection: Datasworn.OracleTablesCollection;
}

export function OracleCollection(props: OracleCollectionProps) {
  const { collection } = props;

  const oracles = getOracleRollables();
  const collections = getOracleCollections();

  return (
    <OracleCollectionRenderer
      collectionId={collection._id}
      collections={collections}
      oracles={oracles}
      visibleCollections={{ [collection._id]: CATEGORY_VISIBILITY.ALL }}
      enhancesCollections={{}}
      visibleOracles={{}}
    />
  );
}
