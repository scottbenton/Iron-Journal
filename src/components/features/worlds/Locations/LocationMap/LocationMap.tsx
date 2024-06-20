import {
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
} from "@mui/material";
import { LocationHexagon, LocationHexagonProps } from "./LocationHexagon";
import {
  LocationMap as ILocationMap,
  MapEntry,
  MapEntryType,
} from "types/Locations.type";
import { useStore } from "stores/store";
import { useState } from "react";
import { MapTool, MapTools } from "./MapTools.enum";
import { MapToolChooser } from "./MapToolChooser";
import { arrayRemove, arrayUnion } from "firebase/firestore";
import { LocationItemAvatar } from "./LocationItemAvatar";
import { checkIsLocationCell, getValidLocations } from "./checkIsLocationCell";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface LocationMapProps {
  locationId: string;
  map?: ILocationMap;
}

export function LocationMap(props: LocationMapProps) {
  const { locationId, map = {} } = props;

  const rows = 13;
  const cols = 18;
  const s = 20;

  // Calculate SVG dimensions
  const width: number = cols * s * Math.sqrt(3) + (s * Math.sqrt(3)) / 2; // Updated
  const height: number = rows * 1.5 * s + s / 2 + 1; // Updated

  const verticalSpacing: number = 1.5 * s; // Updated
  const horizontalSpacing: number = s * Math.sqrt(3); // Updated
  const offsetX: number = (s * Math.sqrt(3)) / 2; // New offset for vertical positioning

  const locationMap = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.locationMap
  );
  const createLocation = useStore(
    (store) =>
      store.worlds.currentWorld.currentWorldLocations.createSpecificLocation
  );
  const updateLocation = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.updateLocation
  );
  const setOpenLocationId = useStore(
    (store) => store.worlds.currentWorld.currentWorldLocations.setOpenLocationId
  );

  const [mapTool, setMapTool] = useState<MapTool>();

  const [multiLocationChooserState, setMultiLocationChooserState] = useState<{
    open: boolean;
    locationIds: string[];
    parentCell?: SVGPolygonElement;
  }>({
    open: false,
    locationIds: [],
  });

  const handleHexClick = (
    row: number,
    col: number,
    locationIds: string[] | undefined,
    cellRef: SVGPolygonElement
  ) => {
    // TODO - check if location still exists when overwriting. If it doesn't, we can overwrite it no problem
    if (mapTool?.type === MapTools.AddPath) {
      const currentCell = map[row]?.[col];
      if (
        !checkIsLocationCell(currentCell ?? undefined, locationId, locationMap)
      ) {
        updateLocation(locationId, {
          [`map.${row}.${col}`]:
            currentCell?.type === MapEntryType.Path
              ? null
              : {
                  type: MapEntryType.Path,
                },
        });
      }
    } else if (mapTool?.type === MapTools.AddLocation) {
      const type = mapTool.locationType;
      createLocation({
        name: "New Location",
        parentLocationId: locationId,
        type: type,
        updatedDate: new Date(),
        createdDate: new Date(),
      })
        .then((id) => {
          updateLocation(locationId, {
            [`map.${row}.${col}.type`]: MapEntryType.Location,
            [`map.${row}.${col}.locationIds`]: arrayUnion(id),
          }).catch(() => {});
        })
        .catch(() => {});
      setMapTool(undefined);
    } else if (mapTool?.type === MapTools.MoveLocation) {
      const movingLocation = locationMap[mapTool.locationId];
      // Remove the previous location from the map
      const parentId = movingLocation.parentLocationId;
      if (parentId) {
        const parentLocation = locationMap[parentId];
        if (parentLocation) {
          const parentMap = parentLocation.map as Record<
            string,
            Record<string, MapEntry>
          >;
          if (parentMap) {
            Object.keys(parentMap ?? {}).forEach((row) => {
              Object.keys(parentMap[row]).forEach((col) => {
                const entry = parentMap[row][col];
                if (
                  entry?.type === MapEntryType.Location &&
                  entry.locationIds.includes(mapTool.locationId)
                ) {
                  updateLocation(parentId, {
                    [`map.${row}.${col}.locationIds`]: arrayRemove(
                      mapTool.locationId
                    ),
                  }).catch(() => {});
                }
              });
            });
          }
        }
      }
      // Update the location with the new parent
      updateLocation(mapTool.locationId, {
        parentLocationId: locationId,
      }).catch(() => {});

      // Add the new location to the map
      updateLocation(locationId, {
        [`map.${row}.${col}.type`]: MapEntryType.Location,
        [`map.${row}.${col}.locationIds`]: arrayUnion(mapTool.locationId),
      }).catch(() => {});

      setMapTool(undefined);
    } else if (!mapTool && locationIds) {
      const filteredLocationIds = getValidLocations(
        locationId,
        locationMap,
        locationIds
      );
      if (filteredLocationIds.length === 1) {
        console.debug();
        setOpenLocationId(locationIds[0]);
      } else if (filteredLocationIds.length > 1) {
        setMultiLocationChooserState({
          open: true,
          locationIds,
          parentCell: cellRef,
        });
      }
    }
  };

  return (
    <Box
      width={"100%"}
      overflow={"hidden"}
      sx={{
        bgcolor: "background.mapBackground",
        color: "#fff",
        p: { xs: 2, md: 3 },
        overflowX: "auto",
      }}
    >
      <Box
        sx={(theme) => ({
          width: "100%",
          color: "#fff",
          "&>svg": {
            display: "flex",
            marginX: "auto",
          },

          "& .hexagon": {
            cursor: "pointer",
            fill: theme.palette.grey[900],
            fillOpacity: "0%",
            color: theme.palette.grey[600],
            "&:hover": {
              fill: theme.palette.grey[200],
              fillOpacity: "20%",
            },
          },
          "& .path-line": {
            color: theme.palette.grey[300],
            background: "none",
            pointerEvents: "none",
            height: 0,
            overflow: "visible",
          },
        })}
      >
        <svg
          width={width}
          height={height}
          style={{ minWidth: width, minHeight: height }}
        >
          {new Array(rows).fill(0).map((_, row) => {
            return new Array(cols - (row % 2 === 1 ? 1 : 0))
              .fill(0)
              .map((_, col) => {
                const x: number =
                  col * horizontalSpacing + (row % 2 === 1 ? offsetX : 0) + s; // Offset every other row
                const y: number = row * verticalSpacing + s; // Start with one hexagon's height

                const mapEntry = map[row]?.[col];

                let pathConnections: LocationHexagonProps["pathConnections"] =
                  undefined;

                if (mapEntry?.type === MapEntryType.Path) {
                  pathConnections = getConnections(
                    map,
                    row,
                    col,
                    locationId,
                    locationMap
                  );
                }

                const locationIds =
                  mapEntry?.type === MapEntryType.Location
                    ? mapEntry.locationIds
                    : [];
                const locations =
                  mapEntry?.type === MapEntryType.Location
                    ? mapEntry.locationIds
                        .filter((locationId) => locationMap[locationId])
                        .map((locationId) => {
                          return locationMap[locationId];
                        })
                    : [];

                return (
                  <LocationHexagon
                    key={`${x}-${y}`}
                    x={x}
                    y={y}
                    size={s}
                    locations={locations}
                    isPath={mapEntry?.type === MapEntryType.Path}
                    pathConnections={pathConnections}
                    onClick={(cell) =>
                      handleHexClick(row, col, locationIds, cell)
                    }
                  />
                );
              });
          })}
          {new Array(rows).fill(0).map((r, row) => {
            return new Array(cols - (row % 2 === 1 ? 1 : 0))
              .fill(0)
              .map((c, col) => {
                const x: number =
                  col * horizontalSpacing + (row % 2 === 1 ? offsetX : 0) + s; // Offset every other row
                const y: number = row * verticalSpacing + s; // Start with one hexagon's height

                let locationIds: string[] = [];
                const hex = map[row]?.[col];
                if (hex?.type === MapEntryType.Location) {
                  locationIds = hex.locationIds;
                }

                let name: string | undefined = undefined;

                if (locationIds.length === 1) {
                  name = locationMap[locationIds[0]]?.name;
                } else if (locationIds.length > 1) {
                  name = `${locationIds.length} Locations`;
                }

                if (name) {
                  return (
                    <text
                      key={`${x}-${y}`}
                      x={x}
                      y={y - (s * 3) / 4} // Position the label below the hexagon
                      fontSize={(s * 3) / 4} // Adjust font size based on hexagon size
                      textAnchor="middle" // Center the text
                      fill={"#fff"}
                    >
                      {name}
                    </text>
                  );
                } else {
                  return null;
                }
              });
          })}
        </svg>
        <Menu
          open={multiLocationChooserState.open}
          anchorEl={multiLocationChooserState.parentCell}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() =>
            setMultiLocationChooserState((prev) => ({ ...prev, open: false }))
          }
        >
          {multiLocationChooserState.locationIds.map((locationId) => {
            const location = locationMap[locationId];
            if (!location) return null;
            return (
              <ListItem
                key={locationId}
                onClick={() => {
                  setOpenLocationId(locationId);
                  setMultiLocationChooserState({
                    open: false,
                    locationIds: [],
                  });
                }}
                disablePadding
              >
                <ListItemButton onClick={() => setOpenLocationId(locationId)}>
                  <ListItemAvatar>
                    <LocationItemAvatar location={location} />
                  </ListItemAvatar>
                  <ListItemText>{location.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            );
          })}
        </Menu>
      </Box>
      <MapToolChooser
        currentTool={mapTool}
        setCurrentTool={setMapTool}
        locations={locationMap}
        currentLocationId={locationId}
      />
    </Box>
  );
}

const getConnections = (
  mapItems: ILocationMap,
  row: number,
  col: number,
  locationId: string,
  locations: Record<string, LocationWithGMProperties>
) => {
  const isEvenRow = row % 2 === 0;

  // Default connections
  const connections: LocationHexagonProps["pathConnections"] = {
    topLeft: false,
    topRight: false,
    left: false,
    right: false,
    bottomLeft: false,
    bottomRight: false,
  };

  // Check if there is a hexagon in the given direction
  const hasHexagon = (r: number, c: number): boolean => {
    const entry = mapItems[r]?.[c];
    if (!entry) return false;

    if (entry.type === MapEntryType.Path) return true;
    else if (entry.type === MapEntryType.Location)
      return checkIsLocationCell(entry, locationId, locations);
    return !!mapItems[r]?.[c]?.type;
  };

  if (isEvenRow) {
    connections.topLeft = hasHexagon(row - 1, col - 1);
    connections.topRight = hasHexagon(row - 1, col);
    connections.left = hasHexagon(row, col - 1);
    connections.right = hasHexagon(row, col + 1);
    connections.bottomLeft = hasHexagon(row + 1, col - 1);
    connections.bottomRight = hasHexagon(row + 1, col);
  } else {
    connections.topLeft = hasHexagon(row - 1, col);
    connections.topRight = hasHexagon(row - 1, col + 1);
    connections.left = hasHexagon(row, col - 1);
    connections.right = hasHexagon(row, col + 1);
    connections.bottomLeft = hasHexagon(row + 1, col);
    connections.bottomRight = hasHexagon(row + 1, col + 1);
  }

  return connections;
};
