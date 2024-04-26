import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { getPublicAssetPath } from "functions/getPublicAssetPath";
import { useNewCrewLinkTheme } from "hooks/featureFlags/useNewCrewLinkTheme";
import { useNewSunderedIslesTheme } from "hooks/featureFlags/useNewSunderedIslesTheme";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import React, { PropsWithChildren } from "react";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export interface PageHeaderProps extends PropsWithChildren {
  label?: string | React.ReactNode;
  subLabel?: string | React.ReactNode;
  actions?: React.ReactNode;
}

const sunderedIslesBorder =
  "data:image/svg+xml;utf8,<svg viewBox='0 0 1200  123' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0 90L50 84C100 79 200 68 300 46C400 24 500 -9 600 2C700 13 800 68 900 90C1000 112 1100 101 1150 96L1200 90V123H1150C1100 123 1000 123 900 123C800 123 700 123 600 123C500 123 400 123 300 123C200 123 100 123 50 123H0V90Z' fill='%23e5e7eb'/></svg>";
export function PageHeader(props: PageHeaderProps) {
  const { label, subLabel, actions, children } = props;

  const isEmpty = !label && !subLabel && !actions && !children;

  const isLightTheme = useTheme().palette.mode === "light";
  const showNewStarforgedTheme = useNewCrewLinkTheme();
  const showNewSunderedIslesTheme = useNewSunderedIslesTheme();

  const isIronsworn = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: true,
    [GAME_SYSTEMS.STARFORGED]: false,
  });

  const borderUrl =
    !isIronsworn && showNewSunderedIslesTheme
      ? sunderedIslesBorder
      : getPublicAssetPath("border.svg");

  return (
    <>
      <Box
        sx={(theme) => ({
          color: theme.palette.darkGrey.contrastText,
          pt: 4,
          pb: isEmpty ? 8 : 10,
          mb: isEmpty ? -8 : -4,
          // width: "100vw",
          backgroundColor:
            isLightTheme && !showNewStarforgedTheme
              ? theme.palette.darkGrey.main
              : undefined,
          position: "relative",
        })}
      >
        <Container
          maxWidth={"xl"}
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {children ? (
            <>{children}</>
          ) : (
            <>
              <Box>
                {label &&
                  (typeof label === "string" ? (
                    <Typography
                      variant={"h4"}
                      component={"h1"}
                      fontFamily={(theme) => theme.fontFamilyTitle}
                    >
                      {label}
                    </Typography>
                  ) : (
                    label
                  ))}
                {subLabel &&
                  (typeof subLabel === "string" ? (
                    <Typography
                      variant={"h6"}
                      component={"h2"}
                      fontFamily={(theme) => theme.fontFamilyTitle}
                    >
                      {subLabel}
                    </Typography>
                  ) : (
                    subLabel
                  ))}
              </Box>
              {actions && (
                <Stack direction={"row"} spacing={1} flexWrap={"wrap"}>
                  {actions}
                </Stack>
              )}
            </>
          )}
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            mt: "-1px",
            mx: 0,
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <Box
            sx={(theme) => ({
              backgroundImage:
                isLightTheme && !showNewStarforgedTheme
                  ? `url("${borderUrl}")`
                  : undefined,
              backgroundColor: showNewSunderedIslesTheme
                ? "darkGrey.main"
                : undefined,
              height: theme.spacing(showNewSunderedIslesTheme ? 2 : 8),
              backgroundRepeat: "repeat-x",
              backgroundSize: "contain",
              backgroundPositionX: "center",
              minWidth: isIronsworn ? 1000 : 500,
            })}
          />
        </Box>
      </Box>
    </>
  );
}
