import { Datasworn } from "@datasworn/core";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";

export interface AssetCardSearchProps {
  handleSearch: (groupId: string, assetId: string) => void;
  assetGroups: Record<string, Datasworn.AssetCollection>;
}

export function AssetCardSearch(props: AssetCardSearchProps) {
  const { handleSearch, assetGroups } = props;

  const options = useMemo(() => {
    return Object.values(assetGroups)
      .filter((group) => !group.enhances)
      .flatMap((group) =>
        Object.values(group.contents ?? {}).map((asset) => ({
          groupId: group._id,
          groupName: group.name,
          assetId: asset._id,
          name: asset.name,
        }))
      )
      .sort((a, b) => a.groupName.localeCompare(b.groupName));
  }, [assetGroups]);

  return (
    <Autocomplete
      options={options}
      groupBy={(option) => option.groupName}
      getOptionLabel={(option) => option.name}
      onChange={(evt, val) => val && handleSearch(val.groupId, val.assetId)}
      renderInput={(params) => (
        <TextField
          sx={{ mr: 2, minWidth: 200 }}
          {...params}
          placeholder="Search"
        />
      )}
    />
  );
}
