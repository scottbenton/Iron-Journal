import { SectorLocationDocument } from "api-calls/world/sectors/sectorLocations/_sectorLocations.type";
import { SECTOR_HEX_TYPES } from "../hexTypes";
import { PlanetContent } from "./PlanetContent";
import { StarContent } from "./StarContent";
import { SettlementContent } from "./SettlementContent";
import { DerelictContent } from "./DerelictContent";
import { VaultContent } from "./VaultContent";
import { OtherContent } from "./OtherContent";

export interface ContentProps {
  locationId: string;
  location: SectorLocationDocument;
  showGMFields?: boolean;
  showGMTips?: boolean;
}

export function Content(props: ContentProps) {
  const { locationId, location, showGMFields, showGMTips } = props;
  const { type } = location;

  switch (type) {
    case SECTOR_HEX_TYPES.Planet:
      return (
        <PlanetContent
          locationId={locationId}
          location={location}
          showGMFields={showGMFields}
          showGMTips={showGMTips}
        />
      );
    case SECTOR_HEX_TYPES.Star:
      return <StarContent locationId={locationId} location={location} />;
    case SECTOR_HEX_TYPES.Settlement:
      return (
        <SettlementContent
          locationId={locationId}
          location={location}
          showGMFields={showGMFields}
          showGMTips={showGMTips}
        />
      );
    case SECTOR_HEX_TYPES.Derelict:
      return (
        <DerelictContent
          locationId={locationId}
          location={location}
          showGMFields={showGMFields}
          showGMTips={showGMTips}
        />
      );
    case SECTOR_HEX_TYPES.Vault:
      return (
        <VaultContent
          locationId={locationId}
          location={location}
          showGMFields={showGMFields}
          showGMTips={showGMTips}
        />
      );
    case SECTOR_HEX_TYPES.Other:
      return <OtherContent locationId={locationId} location={location} />;
    default:
      return null;
  }
}
