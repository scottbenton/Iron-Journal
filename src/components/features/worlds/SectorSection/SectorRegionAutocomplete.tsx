import { Autocomplete, TextField } from "@mui/material";
import { useStore } from "stores/store";
import { Regions } from "types/Sector.type";

export interface SectorRegionAutocompleteProps {}

export function SectorRegionAutocomplete() {
  const currentRegion = useStore((store) => {
    const sectorId = store.worlds.currentWorld.currentWorldSectors.openSectorId;
    if (sectorId) {
      return store.worlds.currentWorld.currentWorldSectors.sectors[sectorId]
        ?.region;
    }
    return undefined;
  });

  const updateRegion = useStore(
    (store) => store.worlds.currentWorld.currentWorldSectors.updateRegion
  );

  const allRegions = useStore((store) => {
    const regions = new Set<string>();
    regions.add(Regions.Terminus);
    regions.add(Regions.Outlands);
    regions.add(Regions.Expanse);
    regions.add(Regions.Void);
    Object.values(
      store.worlds.currentWorld.currentWorldSectors.sectors
    ).forEach((sector) => {
      if (sector.region) {
        regions.add(sector.region);
      }
    });

    return Array.from(regions);
  });

  return (
    <Autocomplete
      freeSolo
      options={allRegions}
      includeInputInList
      renderOption={(props, option) => <li {...props}>{option}</li>}
      value={currentRegion ?? null}
      onChange={(evt, newValue) =>
        updateRegion(newValue ?? undefined).catch(() => {})
      }
      renderInput={(params) => <TextField {...params} label={"Region"} />}
    />
  );
}
