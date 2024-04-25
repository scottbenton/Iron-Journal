import {
  Alert,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
  capitalize,
} from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { dataswornVersion } from "config/datasworn.config";
import { PackageTypes } from "types/homebrew/HomebrewCollection.type";
import { getEditorInviteUrl } from "api-calls/homebrew/editorFunction/getEditorInviteUrl";

export interface AboutSectionProps {
  id: string;
}

export function AboutSection(props: AboutSectionProps) {
  const { id } = props;

  const details = useStore((store) => store.homebrew.collections[id].base);
  const updateDetails = useStore((store) => store.homebrew.updateExpansion);

  const originalTitle = details.title;
  const [title, setTitle] = useState(details.title ?? "");

  useEffect(() => {
    if (originalTitle) {
      setTitle(originalTitle);
    }
  }, [originalTitle]);

  return (
    <Box
      sx={{
        ["&>:not(:last-of-type)"]: {
          mb: 2,
        },
      }}
    >
      <SectionHeading label="Collection Details" breakContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            label={"Title"}
            value={title}
            onChange={(evt) => setTitle(evt.currentTarget.value)}
            onBlur={(evt) =>
              updateDetails(id, { title: evt.currentTarget.value }).catch(
                () => {}
              )
            }
            fullWidth
          />
        </Grid>
        {details.type === PackageTypes.Expansion && (
          <Grid item xs={12}>
            <Typography variant="overline">Expansion For</Typography>
            <Typography>{capitalize(details.rulesetId)}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant={"overline"}>Datasworn Version</Typography>
          <Typography>{dataswornVersion}</Typography>
        </Grid>
        <Grid item xs={12}>
          <SectionHeading label={"Content Sharing"} breakContainer />
        </Grid>
        <Grid item xs={12}>
          <Alert severity={"info"}>
            Players and GMs in the campaigns you run will automatically be able
            to view enabled homebrew content within their character sheets and
            GM screens, but will not be allowed to edit it unless you add them
            as an editor below.
          </Alert>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant={"outlined"} sx={{ p: 2 }}>
            <Typography variant={"h6"}>Editors</Typography>
            <Typography color={"textSecondary"} variant={"body2"}>
              Editors can create, update, or delete any content within this
              collection.
            </Typography>
            <Button
              variant={"outlined"}
              color={"inherit"}
              sx={{ mt: 2 }}
              onClick={() =>
                getEditorInviteUrl(id)
                  .then((url) => console.debug(url))
                  .catch((e) => console.error(e))
              }
            >
              Invite Editor Link
            </Button>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card variant={"outlined"} sx={{ p: 2 }}>
            <Typography variant={"h6"}>Viewers</Typography>
            <Typography color={"textSecondary"} variant={"body2"}>
              Viewers will be able to use this content on their own characters
              and campaigns, but will not be allowed to make any changes.
            </Typography>
            <Button variant={"outlined"} color={"inherit"} sx={{ mt: 2 }}>
              Invite Viewer Link
            </Button>
          </Card>
        </Grid>
      </Grid>
      {/* <SectionHeading label={"Authors"} breakContainer />
      <SectionHeading label="Advanced Details" breakContainer />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DatePicker
            label={"Last Updated Date"}
            slotProps={{
              textField: {
                fullWidth: true,
              },
            }}
            disableFuture
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"ID"} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"Url"} fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label={"License"} fullWidth />
        </Grid>
      </Grid> */}
    </Box>
  );
}
