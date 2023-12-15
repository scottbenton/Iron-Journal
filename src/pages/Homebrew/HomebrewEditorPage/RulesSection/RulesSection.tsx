import { Box, LinearProgress } from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { useStore } from "stores/store";
import { Stats } from "./Stats";

export interface RulesSectionProps {
  id: string;
}

export function RulesSection(props: RulesSectionProps) {
  const { id } = props;

  const loading = useStore(
    (store) => !store.homebrew.collections[id].rules?.loaded
  );

  const rules = useStore((store) => store.homebrew.collections[id].rules?.data);
  const stats = rules?.stats ?? {};

  if (loading) {
    return <LinearProgress sx={{ mx: { xs: -2, sm: -3 } }} />;
  }

  return (
    <Box
      sx={{
        ["&>:not(:last-child)"]: {
          mb: 2,
        },
      }}
    >
      <SectionHeading breakContainer label={"Stats"} />
      <Stats stats={stats} />
      <SectionHeading breakContainer label={"Condition Meters"} />
      <SectionHeading breakContainer label={"Impacts"} />
      <SectionHeading breakContainer label={"Special Tracks"} />
    </Box>
  );
}
