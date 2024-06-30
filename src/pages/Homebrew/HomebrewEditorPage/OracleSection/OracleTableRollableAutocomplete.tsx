import { Autocomplete, Box, ListItemText, TextField } from "@mui/material";
import { useStore } from "stores/store";

export interface OracleTableRollableAutocompleteProps {
  label?: string;
  value?: string;
  onChange: (value: string | undefined) => void;
  disabled?: boolean;
  onBlur: () => void;
  helperText?: string;
  showOriginalNames?: boolean;
}

export function OracleTableRollableAutocomplete(
  props: OracleTableRollableAutocompleteProps
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

  const oracleTableRollableMap = useStore((store) =>
    showOriginalNames
      ? store.rules.oracleMaps.nonReplacedOracleRollableMap
      : store.rules.oracleMaps.oracleRollableMap
  );

  return (
    <Autocomplete
      options={Object.keys(oracleTableRollableMap)}
      getOptionKey={(option) => option}
      getOptionLabel={(key) => oracleTableRollableMap[key]?.name}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label ?? "Oracle Tables"}
        />
      )}
      renderOption={(props, option) => (
        <Box component={"li"} {...props}>
          <ListItemText
            primary={oracleTableRollableMap[option].name}
            secondary={oracleTableRollableMap[option]._id}
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
