import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { backgroundColors } from "./backgroundColors";
import { MapEntryBackgroundColors } from "types/Locations.type";

export interface BackgroundColorSelectorListProps {
  onSelect: (color: MapEntryBackgroundColors) => void;
}

export function BackgroundColorSelectorList(
  props: BackgroundColorSelectorListProps
) {
  const { onSelect } = props;

  return (
    <>
      {Object.values(MapEntryBackgroundColors).map((color) => (
        <ListItem key={color} disablePadding>
          <ListItemButton onClick={() => onSelect(color)}>
            <ListItemIcon
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: 24,
                mr: 2,
              }}
            >
              <Box
                sx={{
                  bgcolor: backgroundColors[color].color,
                  width: 20,
                  height: 20,
                  borderRadius: 999,
                  border: "1px  solid #00000070",
                }}
              />
            </ListItemIcon>
            <ListItemText primary={backgroundColors[color].label} />
          </ListItemButton>
        </ListItem>
      ))}
    </>
  );
}
