import { Box, ButtonBase, SxProps, Typography } from "@mui/material";
import { useStore } from "stores/store";
import { useRoller } from "stores/appState/useRoller";
// import RollIcon from "@mui/icons-material/Casino";

export interface HorizontalStatRollerProps {
  label: string;
  value: number;
  disableRoll?: boolean;
  sx?: SxProps;
  moveName?: string;
}

export function HorizontalStatRoller(props: HorizontalStatRollerProps) {
  const { label, value, disableRoll, moveName, sx } = props;

  const { rollStat } = useRoller();
  const adds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.adds ?? 0
  );
  const hasAdds = adds !== 0;
  const resetAdds = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );

  return (
    <ButtonBase
      sx={[
        (theme) => ({
          borderRadius: 1,
          px: 1,
          py: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          outlineColor: theme.palette.primary.main,
          outlineWidth: 0,
          outlineStyle: "solid",
          bgcolor: theme.palette.mode === "light" ? "grey.200" : "grey.600",
          minWidth: 150,

          transition: theme.transitions.create(
            ["background-color", "border-color", "outline-width"],
            { duration: theme.transitions.duration.shortest }
          ),
          "&:hover": disableRoll
            ? {}
            : {
                outlineWidth: 2,
                outlineColor: theme.palette.primary.main,
              },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      component={ButtonBase}
      disabled={disableRoll}
      onClick={() => {
        rollStat(label, value, moveName, adds);
        resetAdds({ adds: 0 }).catch(() => {});
      }}
    >
      <Box display={"flex"} alignItems={"center"}>
        {/* <RollIcon
          fontSize={"small"}
          sx={(theme) => ({
            color: theme.palette.mode === "light" ? "grey.500" : "grey.200",
          })}
        /> */}
        <Typography
          fontFamily={(theme) => theme.fontFamilyTitle}
          id={`${label}-label`}
          sx={(theme) => ({
            ml: 0.5,
            color: theme.palette.mode === "light" ? "grey.600" : "grey.100",
          })}
        >
          Roll
          {" " + label}
          {hasAdds && label !== "Adds" && "*"}
        </Typography>
      </Box>

      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        minWidth={(theme) => theme.spacing(5)}
        height={(theme) => theme.spacing(5)}
        bgcolor={(theme) =>
          theme.palette.mode === "light" ? "grey.600" : "grey.200"
        }
        color={(theme) =>
          theme.palette.mode === "light" ? "common.white" : "grey.700"
        }
        borderRadius={1}
        ml={2}
        my={-2}
        zIndex={1}
      >
        <Typography
          variant={"h6"}
          fontFamily={(theme) => theme.fontFamilyTitle}
        >
          {value >= 0 ? "+" : ""} {value}
        </Typography>
      </Box>
    </ButtonBase>
  );
}
