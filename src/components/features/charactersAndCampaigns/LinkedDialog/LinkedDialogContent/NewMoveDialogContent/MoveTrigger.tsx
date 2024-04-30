import { Datasworn } from "@datasworn/core";
import { Box, Typography } from "@mui/material";
import { ActionRollTrigger } from "./ActionRollTrigger";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";
import { ProgressRollTrigger } from "./ProgressRollTrigger";

export interface MoveTriggerProps {
  move: Datasworn.Move;
}

export function MoveTrigger(props: MoveTriggerProps) {
  const { move } = props;

  if (move.roll_type === "action_roll" && move.trigger.conditions) {
    const showBulletPoints =
      move.trigger.conditions.filter((condition) => condition.text).length > 0;

    return (
      <Box>
        <Typography variant={"body2"} fontWeight={"bold"}>
          {move.trigger.text}
        </Typography>
        <Box
          component={showBulletPoints ? "ul" : undefined}
          pl={showBulletPoints ? 1.5 : undefined}
        >
          {move.trigger.conditions.map((condition, index) => (
            <Box
              key={index}
              mt={2}
              component={showBulletPoints ? "li" : undefined}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                {condition.text && (
                  <MarkdownRenderer markdown={condition.text} />
                )}
                {condition.roll_options.map((option, index) => (
                  <ActionRollTrigger
                    key={index}
                    conditionRollOption={option}
                    moveName={move.name}
                    sx={{ ml: condition.text ? 2 : 0 }}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (move.roll_type === "progress_roll" && move.trigger.conditions) {
    const showBulletPoints =
      move.trigger.conditions.filter((condition) => condition.text).length > 0;

    return (
      <Box>
        <Typography variant={"body2"} fontWeight={"bold"}>
          {move.trigger.text}
        </Typography>
        <Box
          component={showBulletPoints ? "ul" : undefined}
          pl={showBulletPoints ? 1.5 : undefined}
        >
          {move.trigger.conditions.map((condition, index) => (
            <Box
              key={index}
              mt={2}
              component={showBulletPoints ? "li" : undefined}
            >
              <Box>
                {condition.text && (
                  <MarkdownRenderer markdown={condition.text} />
                )}
                <ProgressRollTrigger key={index} progressInfo={move.tracks} />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  return null;
}
