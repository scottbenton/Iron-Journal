import { Autocomplete, Box, ListItemText, TextField } from "@mui/material";
import { useStore } from "stores/store";

export interface AssetAutocompleteProps {
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  onBlur: () => void;
  helperText?: string;
}

export function AssetAutocomplete(props: AssetAutocompleteProps) {
  const { label, value, onChange, disabled, onBlur, helperText } = props;

  const assetMap = useStore((store) => store.rules.assetMaps.assetMap);

  return (
    <Autocomplete
      options={Object.keys(assetMap)}
      getOptionKey={(option) => option}
      getOptionLabel={(key) => assetMap[key]?.name}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label ?? "Assets"}
        />
      )}
      renderOption={(props, option) => (
        <Box component={"li"} {...props}>
          <ListItemText
            primary={assetMap[option].name}
            secondary={assetMap[option]._id}
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
