import { SvgIcon, SvgIconProps } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { IconColors } from "types/Icon.type";
import { colors } from "./colors";
import { IconBaseProps } from "react-icons";

export interface GameIconProps extends SvgIconProps {
  iconName: string;
  iconColor: IconColors;
}

export function GameIcon(props: GameIconProps) {
  const { iconName, iconColor, sx, ...svgProps } = props;

  const [icons, setIcons] = useState<Record<string, FC<IconBaseProps>>>();

  useEffect(() => {
    const importIcons = async () => {
      const components = await import("react-icons/gi");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { default: _, ...newIcons } = components;
      setIcons(newIcons);
    };

    importIcons();
  }, []);

  const icon = icons?.[iconName];

  if (!icon) {
    return null;
  }

  return (
    <SvgIcon
      sx={[{ color: colors[iconColor] }, ...(Array.isArray(sx) ? sx : [sx])]}
      component={icon}
      {...svgProps}
      inheritViewBox
    />
  );
}
