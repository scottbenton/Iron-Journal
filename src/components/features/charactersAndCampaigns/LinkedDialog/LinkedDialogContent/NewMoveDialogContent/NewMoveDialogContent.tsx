import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  DialogContent,
} from "@mui/material";
import { LinkedDialogContentTitle } from "../LinkedDialogContentTitle";
import { useStore } from "stores/store";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { MoveTrigger } from "./MoveTrigger";
import { MoveOutcomes } from "./MoveOutcomes";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { MoveOracles } from "./MoveOracles";

export interface NewMoveDialogContentProps {
  id: string;
  handleBack: () => void;
  handleClose: () => void;
  isLastItem: boolean;
}

export function NewMoveDialogContent(props: NewMoveDialogContentProps) {
  const { id, handleBack, handleClose, isLastItem } = props;

  const moves = useStore((store) => store.rules.moveMaps.moveMap);
  const move = moves[id];

  if (!move) {
    return (
      <>
        <LinkedDialogContentTitle
          id={id}
          handleBack={handleBack}
          handleClose={handleClose}
          isLastItem={isLastItem}
        >
          Move Not Found
        </LinkedDialogContentTitle>
        <DialogContent>Sorry, we could not find that move.</DialogContent>
      </>
    );
  }

  const shouldShowNewView = () => {
    if (move.trigger && move.outcomes) {
      let hasCustomRollOptions = false;
      move.trigger.conditions.forEach((condition) => {
        condition.roll_options.forEach((option) => {
          if (option.using === "custom") {
            hasCustomRollOptions = true;
          }
        });
      });
      if (!hasCustomRollOptions) {
        return true;
      }
    }
    return false;
  };

  console.debug(move);

  return (
    <>
      <LinkedDialogContentTitle
        id={id}
        handleBack={handleBack}
        handleClose={handleClose}
        isLastItem={isLastItem}
      >
        {move.name}
      </LinkedDialogContentTitle>
      <DialogContent>
        {shouldShowNewView() ? (
          <>
            <MoveTrigger move={move} />
            <MoveOutcomes move={move} />
            <MoveOracles oracles={move.oracles} />

            <Box>
              <Accordion variant="outlined" sx={{ mt: 2 }}>
                <AccordionSummary
                  id={"move-text-header"}
                  aria-controls={"panel-content"}
                  expandIcon={<ExpandMoreIcon />}
                >
                  Original Move Text
                </AccordionSummary>
                <AccordionDetails>
                  <MarkdownRenderer markdown={move.text} />
                </AccordionDetails>
              </Accordion>
            </Box>
          </>
        ) : (
          <>
            <MarkdownRenderer markdown={move.text} />
            <MoveOracles oracles={move.oracles} />
          </>
        )}
      </DialogContent>
    </>
  );
}
