import { Box, ButtonBase, SxProps, useTheme } from "@mui/material";
import { ClockSegment } from "./ClockSegment";
import { PropsWithChildren } from "react";

export type ClockSize = "small" | "medium";

const sizes: Record<ClockSize, number> = {
  small: 60,
  medium: 100,
};

export interface ClockCircleProps {
  segments: number;
  value: number;
  onClick?: () => void;
  size?: ClockSize;
}

export function ClockCircle(props: ClockCircleProps) {
  const { segments, value, onClick, size = "medium" } = props;
  const theme = useTheme();

  const Wrapper = (
    props: PropsWithChildren<{
      onClick?: () => void;
      sx: SxProps;
    }>
  ) => {
    const { children, onClick, sx } = props;
    const ariaLabel = `Clock with ${segments} segments. ${value} filled.`;

    if (onClick) {
      return (
        <ButtonBase sx={sx} onClick={onClick} aria-label={ariaLabel}>
          {children}
        </ButtonBase>
      );
    }
    return (
      <Box sx={sx} aria-label={ariaLabel}>
        {children}
      </Box>
    );
  };

  return (
    <Wrapper sx={{ borderRadius: 999 }} onClick={onClick}>
      <svg
        width={sizes[size]}
        height={sizes[size]}
        viewBox="-2 -2 104 104"
        stroke={theme.palette.grey[theme.palette.mode === "light" ? 700 : 600]}
      >
        {Array.from({ length: segments }).map((_, index) => (
          <ClockSegment
            key={index}
            index={index}
            segments={segments}
            filled={value}
          />
        ))}
      </svg>
    </Wrapper>
  );
}
