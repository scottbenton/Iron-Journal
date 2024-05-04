import {
  Box,
  Button,
  Card,
  Chip,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Clock as IClock, TrackStatus } from "types/Track.type";
import { ClockCircle } from "./ClockCircle";
import CheckIcon from "@mui/icons-material/Check";
import { useConfirm } from "material-ui-confirm";
import { ClockOracleKeys } from "types/Track.type";
import DieIcon from "@mui/icons-material/Casino";
import { useRoller } from "stores/appState/useRoller";

const clockOracleMap = {
  [ClockOracleKeys.AlmostCertain]:
    "starforged/oracles/moves/ask_the_oracle/almost_certain",
  [ClockOracleKeys.Likely]: "starforged/oracles/moves/ask_the_oracle/likely",
  [ClockOracleKeys.FiftyFifty]:
    "starforged/oracles/moves/ask_the_oracle/fifty-fifty",
  [ClockOracleKeys.Unlikely]:
    "starforged/oracles/moves/ask_the_oracle/unlikely",
  [ClockOracleKeys.SmallChance]:
    "starforged/oracles/moves/ask_the_oracle/small_chance",
};

export interface ClockProps {
  clock: IClock;
  onEdit?: () => void;
  onValueChange?: (value: number) => void;
  onSelectedOracleChange?: (oracleKey: ClockOracleKeys) => void;
  onComplete?: () => void;
}

export function Clock(props: ClockProps) {
  const { clock, onEdit, onValueChange, onSelectedOracleChange, onComplete } =
    props;

  const { rollClockProgression } = useRoller();

  const confirm = useConfirm();

  const handleCompleteClick = () => {
    if (onComplete) {
      confirm({
        title: "Complete Clock",
        description: "Are you sure you want to complete this clock?",
        confirmationText: "Complete",
        confirmationButtonProps: {
          variant: "contained",
          color: "primary",
        },
      })
        .then(() => {
          onComplete();
        })
        .catch(() => {});
    }
  };

  const handleProgressionRoll = () => {
    if (onValueChange) {
      const result = rollClockProgression(
        clock.label,
        clockOracleMap[clock.oracleKey ?? ClockOracleKeys.FiftyFifty]
      );

      if (result && clock.value < clock.segments) {
        onValueChange(clock.value + 1);
      }
    }
  };

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"flex-start"}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          fontFamily={(theme) => theme.fontFamilyTitle}
          variant={"h6"}
        >
          {clock.label}
          {onEdit && (
            <Link
              color={"inherit"}
              component={"button"}
              sx={{ ml: 2 }}
              onClick={() => onEdit()}
            >
              Edit
            </Link>
          )}
        </Typography>
        {clock.status === TrackStatus.Completed && (
          <Chip
            label={"Completed"}
            color={"success"}
            sx={{ ml: 2 }}
            size={"small"}
          />
        )}
      </Box>
      {clock.description && (
        <Typography
          variant={"subtitle1"}
          color={(theme) => theme.palette.text.secondary}
          whiteSpace={"pre-wrap"}
        >
          {clock.description}
        </Typography>
      )}
      <Card
        sx={(theme) => ({
          bgcolor: theme.palette.background.paperInlay,
          p: 1,
          display: "flex",
          flexWrap: "wrap",
          mt: 1,
        })}
        variant={"outlined"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"flex-start"}
          mr={2}
          minWidth={200}
        >
          <TextField
            label={"Roll Progress"}
            select
            value={clock.oracleKey ?? ClockOracleKeys.FiftyFifty}
            onChange={(evt) =>
              onSelectedOracleChange &&
              onSelectedOracleChange(evt.target.value as ClockOracleKeys)
            }
            disabled={!onSelectedOracleChange}
            fullWidth
          >
            <MenuItem value={ClockOracleKeys.AlmostCertain}>
              Almost Certain
            </MenuItem>
            <MenuItem value={ClockOracleKeys.Likely}>Likely</MenuItem>
            <MenuItem value={ClockOracleKeys.FiftyFifty}>Fifty Fifty</MenuItem>
            <MenuItem value={ClockOracleKeys.Unlikely}>Unlikely</MenuItem>
            <MenuItem value={ClockOracleKeys.SmallChance}>
              Small Chance
            </MenuItem>
          </TextField>
          {onValueChange && (
            <Button
              sx={{ mt: 1 }}
              color={"inherit"}
              endIcon={<DieIcon />}
              onClick={() => handleProgressionRoll()}
            >
              Roll Progress
            </Button>
          )}
        </Box>
        <ClockCircle
          value={clock.value}
          segments={clock.segments}
          onClick={
            onValueChange
              ? () => {
                  onValueChange(
                    clock.value >= clock.segments ? 0 : clock.value + 1
                  );
                }
              : undefined
          }
        />
      </Card>
      {onComplete && (
        <Button
          variant={"outlined"}
          color={"inherit"}
          onClick={handleCompleteClick}
          sx={{ mt: 1 }}
          endIcon={<CheckIcon />}
        >
          Complete Clock
        </Button>
      )}
    </Box>
  );
}
