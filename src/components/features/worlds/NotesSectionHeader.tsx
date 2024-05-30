import { Alert, Grid } from "@mui/material";
import { GuideAndPlayerHeader } from "./common";

export interface NotesSectionHeaderProps {
  sharedWithPlayers?: boolean;
}

export function NotesSectionHeader(props: NotesSectionHeaderProps) {
  const { sharedWithPlayers } = props;

  return (
    <>
      <Grid item xs={12}>
        <GuideAndPlayerHeader breakContainer />
      </Grid>
      {!sharedWithPlayers && (
        <Grid item xs={12}>
          <Alert severity="warning">
            These notes are not yet visible to players because this location is
            hidden from them.
          </Alert>
        </Grid>
      )}
    </>
  );
}
