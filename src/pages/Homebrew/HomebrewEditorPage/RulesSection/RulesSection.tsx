import { Box } from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { Stats } from "./Stats";
import { ConditionMeters } from "./ConditionMeters";
import { Impacts } from "./Impacts";
import { LegacyTracks } from "./LegacyTracks";
import { NonLinearMeters } from "./NonLinearMeters";

export interface RulesSectionProps {
  id: string;
  isEditor: boolean;
}

export function RulesSection(props: RulesSectionProps) {
  const { id, isEditor } = props;

  return (
    <Box
      sx={{
        ["&>:not(:last-child)"]: {
          mb: 2,
        },
      }}
    >
      <SectionHeading breakContainer label={"Stats"} />
      <Stats homebrewId={id} isEditor={isEditor} />
      <SectionHeading breakContainer label={"Condition Meters"} />
      <ConditionMeters homebrewId={id} isEditor={isEditor} />
      <SectionHeading breakContainer label={"Non-Linear Meters"} />
      <NonLinearMeters homebrewId={id} isEditor={isEditor} />
      <SectionHeading breakContainer label={"Impacts / Debilities"} />
      <Impacts homebrewId={id} isEditor={isEditor} />
      <SectionHeading breakContainer label={"Legacy Tracks"} />
      <LegacyTracks homebrewId={id} isEditor={isEditor} />
    </Box>
  );
}
