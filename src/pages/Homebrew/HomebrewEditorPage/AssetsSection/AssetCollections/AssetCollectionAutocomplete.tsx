import { Autocomplete, Box, ListItemText, TextField } from "@mui/material";
import { useStore } from "stores/store";

export interface AssetCollectionAutocompleteProps {
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  onBlur: () => void;
  helperText?: string;
  showOriginalNames?: boolean;
}

export function AssetCollectionAutocomplete(
  props: AssetCollectionAutocompleteProps
) {
  const {
    label,
    value,
    onChange,
    disabled,
    onBlur,
    helperText,
    showOriginalNames,
  } = props;

  const assetCollectionMap = useStore((store) =>
    showOriginalNames
      ? store.rules.assetMaps.nonReplacedAssetCollectionMap
      : store.rules.assetMaps.assetCollectionMap
  );

  return (
    <Autocomplete
      options={Object.keys(assetCollectionMap)}
      getOptionKey={(option) => option}
      getOptionLabel={(key) => assetCollectionMap[key]?.name}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label ?? "Asset Collections"}
        />
      )}
      renderOption={(props, option) => (
        <Box component={"li"} {...props}>
          <ListItemText
            primary={assetCollectionMap[option].name}
            secondary={assetCollectionMap[option]._id}
          />
        </Box>
      )}
      value={value ?? null}
      onChange={(evt, value) => {
        onChange(value ?? undefined);
      }}
      onBlur={onBlur}
      disabled={disabled}
    />
  );
}
