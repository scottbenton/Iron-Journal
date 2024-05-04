import { Autocomplete, Box, ListItemText, TextField } from "@mui/material";
import { useStore } from "stores/store";

export interface OracleCollectionAutocompleteProps {
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  onBlur: () => void;
  helperText?: string;
  showOriginalNames?: boolean;
}

export function OracleCollectionAutocomplete(
  props: OracleCollectionAutocompleteProps
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

  const oracleCollectionMap = useStore((store) =>
    showOriginalNames
      ? store.rules.oracleMaps.nonReplacedOracleCollectionMap
      : store.rules.oracleMaps.oracleCollectionMap
  );

  return (
    <Autocomplete
      options={Object.keys(oracleCollectionMap)}
      getOptionKey={(option) => option}
      getOptionLabel={(key) => oracleCollectionMap[key]?.name}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label ?? "Oracle Collections"}
        />
      )}
      renderOption={(props, option) => (
        <Box component={"li"} {...props}>
          <ListItemText
            primary={oracleCollectionMap[option].name}
            secondary={oracleCollectionMap[option]._id}
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
