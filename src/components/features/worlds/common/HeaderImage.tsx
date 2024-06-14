import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { IconColors, IconDefinition } from "types/Icon.type";
import { GameIcon } from "components/shared/GameIcons/GameIcon";

export interface HeaderImageProps {
  imageSrc?: string;
  icon?: IconDefinition;

  handleClick: () => void;
}

export function HeaderImage(props: HeaderImageProps) {
  const { imageSrc, icon, handleClick } = props;

  const [isHovering, setIsHovering] = useState(false);

  if (imageSrc) {
    return (
      <Box
        component={imageSrc ? ButtonBase : undefined}
        sx={(theme) => ({
          color: theme.palette.common.white,
          borderRadius: 1,
          border: `4px solid ${theme.palette.background.paper}`,
          width: { xs: 100, lg: 150 },
          height: { xs: 100, lg: 150 },
          position: "relative",
          flexShrink: 0,
          top: { xs: theme.spacing(-5), lg: theme.spacing(-9) },
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",

          bgcolor: "background.paper",
          "&:focus-visible>#image": {
            backgroundColor:
              theme.palette.mode === "light"
                ? theme.palette.grey[400]
                : theme.palette.grey[800],
          },
          "&>.MuiTouchRipple-root": {
            borderRadius: 1,
          },
        })}
        onClick={handleClick}
        onMouseEnter={imageSrc ? () => setIsHovering(true) : undefined}
        onMouseLeave={imageSrc ? () => setIsHovering(false) : undefined}
      >
        <Box
          id={"image"}
          sx={(theme) => ({
            position: "absolute",
            backgroundColor:
              imageSrc && isHovering
                ? theme.palette.grey[700]
                : theme.palette.grey[800],
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("${imageSrc}")`,
            backgroundBlendMode: imageSrc && isHovering ? "overlay" : "initial",
            backgroundSize: "cover",
            backgroundPosition: "center top",

            borderRadius: 1,
          })}
        />
        {imageSrc && isHovering && (
          <FullscreenIcon color={"inherit"} sx={{ position: "relative" }} />
        )}
      </Box>
    );
  }
  if (icon?.key) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          bgcolor: "background.mapBackground",
          p: 1,
        }}
      >
        <GameIcon
          iconName={icon.key}
          iconColor={icon.color ?? IconColors.White}
          sx={{ fontSize: 48, position: "relative" }}
        />
      </Box>
    );
  }
  return null;
}
