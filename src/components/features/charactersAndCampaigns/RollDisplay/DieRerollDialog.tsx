import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { D10Icon } from "assets/D10Icon";
import { D6Icon } from "assets/D6Icon";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { ROLL_RESULT, StatRoll } from "types/DieRolls.type";
import { RollDisplay } from "./RollDisplay";
import React, { useState } from "react";
import { getRolls } from "stores/appState/useRoller";
import { useSnackbar } from "providers/SnackbarProvider";
import { useStore } from "stores/store";

export interface DieRerollDialogProps {
  open: boolean;
  handleClose: () => void;
  rollId: string;
  roll: StatRoll;
}

export function DieRerollDialog(props: DieRerollDialogProps) {
  const { open, handleClose, roll, rollId } = props;

  const momentum = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.momentum ?? 0
  );

  const { info } = useSnackbar();
  const updateRoll = useStore((store) => store.gameLog.updateRoll);
  const [loading, setLoading] = useState(false);

  const [action, setAction] = useState(roll.action);
  const [challenge1, setChallenge1] = useState(roll.challenge1);
  const [challenge2, setChallenge2] = useState(roll.challenge2);

  const matchedNegativeMomentum = momentum < 0 && Math.abs(momentum) === action;
  const actionTotal = Math.min(
    10,
    (matchedNegativeMomentum ? 0 : action) +
      (roll.modifier ?? 0) +
      (roll.adds ?? 0)
  );

  let result: ROLL_RESULT = ROLL_RESULT.WEAK_HIT;
  if (actionTotal > challenge1 && actionTotal > challenge2) {
    result = ROLL_RESULT.HIT;
    // Strong Hit
  } else if (actionTotal <= challenge1 && actionTotal <= challenge2) {
    result = ROLL_RESULT.MISS;
  }
  const updatedRoll: StatRoll = {
    ...roll,
    action,
    challenge1,
    challenge2,
    result,
    matchedNegativeMomentum,
  };

  const hideDice = useStore(
    (store) => store.auth.userDoc?.hideDice
  );

  const theme = useTheme();

  const handleRoll = async (
    setter: React.Dispatch<React.SetStateAction<number>>,
    type: "challenge" | "action"
  ) => {
    const roll = type === "challenge"
      ? await getRolls(1, 0, theme, hideDice === true)
      : await getRolls(0, 1, theme, hideDice === true);
    setter(roll[0].value);
    info(`Rerolled ${type} die for a new value of ${roll[0].value}`);
  };

  const handleSave = () => {
    setLoading(true);
    updateRoll(rollId, updatedRoll)
      .then(() => {
        setLoading(false);
        handleClose();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onClick={(evt) => evt.stopPropagation()}
    >
      <DialogTitleWithCloseButton onClose={handleClose}>
        Reroll{" "}
        {roll.moveName
          ? `${roll.moveName} (${
              roll.rollLabel.charAt(0).toLocaleUpperCase() +
              roll.rollLabel.slice(1)
            })`
          : roll.rollLabel}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack
          spacing={1}
          sx={{
            "&>div": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: 1,
              bgcolor: "background.paperInlay",
              px: 1,
              py: 1,
              "&>div": {
                display: "flex",
                alignItems: "center",
                "& svg": {
                  color: "text.secondary",
                },
              },
            },
          }}
        >
          <Box>
            <Box>
              <D6Icon />
              <Typography variant={"h6"} component={"span"} ml={1}>
                {action}
              </Typography>
            </Box>
            <Button onClick={() => handleRoll(setAction, "action")}>
              Reroll
            </Button>
          </Box>
          <Box>
            <Box>
              <D10Icon />
              <Typography variant={"h6"} component={"span"} ml={1}>
                {challenge1}
              </Typography>
            </Box>
            <Button onClick={() => handleRoll(setChallenge1, "challenge")}>
              Reroll
            </Button>
          </Box>
          <Box>
            <Box>
              <D10Icon />
              <Typography variant={"h6"} component={"span"} ml={1}>
                {challenge2}
              </Typography>
            </Box>
            <Button onClick={() => handleRoll(setChallenge2, "challenge")}>
              Reroll
            </Button>
          </Box>
        </Stack>
        <Box mt={4}>
          <Typography variant={"h6"} component={"p"}>
            Result
          </Typography>
          <RollDisplay roll={updatedRoll} isExpanded />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant={"contained"}
          color={"primary"}
          onClick={handleSave}
          disabled={loading}
        >
          Save Roll
        </Button>
      </DialogActions>
    </Dialog>
  );
}
