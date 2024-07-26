import { CharacterConditionMeters } from "./CharacterConditionMeters";
import { CharacterDetails } from "./CharacterDetails";
import { CharacterExperience } from "./CharacterExperience";
import { CharacterRollAffects } from "./CharacterRollAffects";
import { CharacterStats } from "./CharacterStats";
import { Debilities } from "./Debilities";
import { LegacyTracks } from "./LegacyTracks";

export function CharacterPanel() {
  return (
    <>
      <CharacterDetails />
      <CharacterStats />
      <CharacterConditionMeters />
      <CharacterRollAffects />
      <Debilities />
      <LegacyTracks />
      <CharacterExperience />
    </>
  );
}
