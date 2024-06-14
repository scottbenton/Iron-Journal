import { DebouncedOracleInput } from "components/shared/DebouncedOracleInput";
import { FieldConfig } from "config/locations.config";
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

  const updateLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.updateLocation
  );
  const updateLocationGMProperties = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.updateLocationGMProperties
  );

  const value = isGMField
    ? location.gmProperties?.fields?.[field.key]
    : location.fields?.[field.key];

  const handleUpdate = (newValue: string) => {
    if (isGMField) {
      updateLocationGMProperties(locationId, {
        fields: {
          [field.key]: newValue,
        },
      }).catch(() => {});
    } else {
      updateLocation(locationId, {
        [`fields.${field.key}`]: newValue,
      }).catch(() => {});
    }
  };

  if (field.type === "oracle") {
    return (
      <DebouncedOracleInput
        label={field.label}
        initialValue={value ?? ""}
        updateValue={(newValue) => handleUpdate(newValue)}
        oracleTableId={field.oracleId}
      />
    );
  }

  return null;
}
