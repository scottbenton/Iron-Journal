import { Box, Card, CardActionArea, Typography } from "@mui/material";
import PhotoIcon from "@mui/icons-material/Photo";
import HiddenIcon from "@mui/icons-material/VisibilityOff";
import { LocationWithGMProperties } from "stores/world/currentWorld/locations/locations.slice.type";

export interface LocationCardProps {
  location: LocationWithGMProperties;
  openLocation: () => void;
  showHiddenTag?: boolean;
}

export function LocationCard(props: LocationCardProps) {
  const { location, openLocation, showHiddenTag } = props;

  return (
    <Card variant={"outlined"} sx={{ overflow: "visible" }}>
      <CardActionArea
        onClick={() => openLocation()}
        sx={(theme) => ({
          p: 2,
          "& #portrait": {
            marginTop: -3,
            marginLeft: -1,
            transitionProperty: "margin-top margin-bottom",
            transitionDuration: `${theme.transitions.duration.shorter}ms`,
            transitionTimingFunction: theme.transitions.easing.easeInOut,
          },
          "&:hover, &:focus-visible": {
            "& #portrait": {
              marginTop: -1.5,
              marginBottom: -1.5,
            },
          },
        })}
      >
        <Box display={"flex"} alignItems={"start"}>
          <Box
            id={"portrait"}
            sx={(theme) => ({
              marginRight: 2,
              width: 80,
              height: 80,
              flexShrink: 0,
              borderRadius: `${theme.shape.borderRadius}px`,
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[300]
                  : theme.palette.grey[700],
              backgroundImage: `url(${location.imageUrl})`,
              backgroundPosition: "center top",
              backgroundSize: "cover",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: theme.shadows[3],
            })}
          >
            {!location.imageUrl && (
              <PhotoIcon
                sx={(theme) => ({
                  color:
                    theme.palette.mode === "light"
                      ? theme.palette.grey[500]
                      : theme.palette.grey[300],
                })}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            flexGrow={1}
            overflow={"hidden"}
          >
            <Box overflow={"hidden"}>
              {location.type && (
                <Typography
                  whiteSpace={"nowrap"}
                  overflow={"hidden"}
                  variant={"overline"}
                  textOverflow={"ellipsis"}
                >
                  {location.type}
                </Typography>
              )}
              <Typography
                whiteSpace={"nowrap"}
                overflow={"hidden"}
                textOverflow={"ellipsis"}
              >
                {location.name}
              </Typography>
            </Box>
            {!location.sharedWithPlayers && showHiddenTag && (
              <HiddenIcon color={"action"} />
            )}
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}
