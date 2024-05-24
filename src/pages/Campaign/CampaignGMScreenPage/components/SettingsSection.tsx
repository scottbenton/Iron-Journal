import { Box, Button, Stack } from "@mui/material";
import { ExpansionSelectorDialog } from "components/features/charactersAndCampaigns/ExpansionSelector/ExpansionSelectorDialog";
import { SectionHeading } from "components/shared/SectionHeading";
import { useState } from "react";

export function SettingsSection() {
  const [expansionDialogOpen, setExpansionDialogOpen] = useState(false);

  return (
    <Stack spacing={3} sx={{ pb: 2 }}>
      <SectionHeading label={"Expansions"} />
      <Box sx={{ px: 2 }}>
        <Button
          onClick={() => setExpansionDialogOpen(true)}
          variant={"outlined"}
        >
          Manage Expansions
        </Button>
      </Box>
      <ExpansionSelectorDialog
        open={expansionDialogOpen}
        onClose={() => setExpansionDialogOpen(false)}
      />
    </Stack>
  );
}
