import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { DebouncedOracleInput } from "components/shared/DebouncedOracleInput";
import {
  FieldConfig,
  FieldConfigsWithoutFunctions,
} from "config/locations.config";
import { useStore } from "stores/store";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface LocationFieldProps {
  locationId: string;
  field: FieldConfig;
  location: LocationWithGMProperties;
  isGMField?: boolean;
}

export function LocationField(props: LocationFieldProps) {
  const { locationId, field, location, isGMField } = props;

  let fieldConfig: FieldConfigsWithoutFunctions;
  if (typeof field === "function") {
    fieldConfig = field(locationId, location);
  } else {
    fieldConfig = field;
  }

  const updateLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.updateLocation
  );
  const updateLocationGMProperties = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.updateLocationGMProperties
  );

  const value = isGMField
    ? location.gmProperties?.fields?.[fieldConfig.key]
    : location.fields?.[fieldConfig.key];

  const handleUpdate = (newValue: string) => {
    if (isGMField) {
      updateLocationGMProperties(locationId, {
        fields: {
          [fieldConfig.key]: newValue,
        },
      }).catch(() => {});
    } else {
      updateLocation(locationId, {
        [`fields.${fieldConfig.key}`]: newValue,
      }).catch(() => {});
    }
  };

  if (fieldConfig.type === "oracle") {
    return (
      <Grid
        item
        xs={12}
        md={fieldConfig.fullWidth ? undefined : 6}
        key={fieldConfig.key}
      >
        <DebouncedOracleInput
          label={fieldConfig.label}
          initialValue={value ?? ""}
          updateValue={(newValue) => handleUpdate(newValue)}
          oracleTableId={fieldConfig.oracleId}
        />
      </Grid>
    );
  } else if (fieldConfig.type === "autocomplete") {
    return (
      <Grid
        item
        xs={12}
        md={fieldConfig.fullWidth ? undefined : 6}
        key={fieldConfig.key}
      >
        <Autocomplete
          freeSolo
          options={fieldConfig.options}
          includeInputInList
          renderOption={(props, option) => <li {...props}>{option}</li>}
          value={value ?? ""}
          onChange={(evt, newValue) => handleUpdate(newValue ?? "")}
          renderInput={(params) => (
            <TextField {...params} label={fieldConfig.label} />
          )}
        />
      </Grid>
    );
  } else if (fieldConfig.type === "section-title") {
    return (
      <Grid item xs={12} key={fieldConfig.label}>
        <Typography variant={"overline"} sx={{ mt: 2 }}>
          {fieldConfig.label}
        </Typography>
      </Grid>
    );
  }

  return null;
}
