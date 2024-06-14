import {
  Box,
  SxProps,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { IconColors } from "types/Icon.type";
import { colors } from "./colors";

export interface IconColorSelectorProps {
  selectedColor: IconColors;
  setSelectedColor: (color: IconColors) => void;
  sx?: SxProps<Theme>;
}

export function IconColorSelector(props: IconColorSelectorProps) {
  const { selectedColor, setSelectedColor, sx } = props;

  const isIconColor = (value: unknown): value is IconColors => {
    return Object.values(IconColors).includes(value as IconColors);
  };

  return (
    <ToggleButtonGroup
      sx={[
        {
          width: "100%",
          display: "flex",
          justifyContent: "stretch",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      exclusive
      value={selectedColor}
      onChange={(_, value) => isIconColor(value) && setSelectedColor(value)}
      aria-label={"Icon Colors"}
    >
      {Object.values(IconColors).map((color) => (
        <ToggleButton
          size={"small"}
          key={color}
          value={color}
          aria-label={color}
          sx={{ px: 0.5, py: 1, flexGrow: 1 }}
        >
          <Box
            sx={{
              bgcolor: colors[color],
              width: 20,
              height: 20,
              borderRadius: 999,
              border: "1px  solid #00000070",
            }}
          />
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
