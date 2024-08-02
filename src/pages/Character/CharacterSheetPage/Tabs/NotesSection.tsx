import { Box, useMediaQuery, useTheme } from "@mui/material";
import { Notes } from "components/features/charactersAndCampaigns/Notes/Notes";
export function NotesSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box height={"100%"}>
      <Notes condensedView={isMobile} />
    </Box>
  );
}
