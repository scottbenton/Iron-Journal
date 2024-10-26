import { CharacterConditionMeters } from "./CharacterConditionMeters";
import { CharacterDetails } from "./CharacterDetails";
import { CharacterExperience } from "./CharacterExperience";
import { CharacterStats } from "./CharacterStats";
import { Debilities } from "./Debilities";
import { LegacyTracks } from "./LegacyTracks";

export function CharacterPanel() {
  return (
    <>
      <CharacterDetails />
      <CharacterStats />
      <CharacterConditionMeters />
      <Debilities />
      <LegacyTracks />
      <CharacterExperience />
    </>
  );
}
