import {
  Alert,
  Box,
  Button,
  Card,
  Divider,
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
import { InviteEditorDialog } from "./InviteEditorDialog";
import { useSnackbar } from "providers/SnackbarProvider";
import { constructHomebrewEditorPath } from "pages/Homebrew/routes";
import { UserList } from "./UserList";

export interface AboutSectionProps {
  id: string;
  isEditor: boolean;
}

export function AboutSection(props: AboutSectionProps) {
  const { id, isEditor } = props;

  const { success } = useSnackbar();

  const details = useStore((store) => store.homebrew.collections[id].base);
  const updateDetails = useStore((store) => store.homebrew.updateExpansion);

  const originalTitle = details.title;
  const [title, setTitle] = useState(details.title ?? "");

  useEffect(() => {
    if (originalTitle) {
      setTitle(originalTitle);
    }
  }, [originalTitle]);

  const [inviteEditorDialogOpen, setInviteEditorDialogOpen] = useState(false);

  const handleCopy = () => {
    const viewerLink = constructHomebrewEditorPath(id);
    navigator.clipboard
      .writeText(window.location.origin + viewerLink)
      .then(() => {
        success("Copied URL to clipboard");
      });
  };

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
        {isEditor && (
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
        )}
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
          <SectionHeading
            label={isEditor ? "Content Sharing" : "Author Info"}
            breakContainer
          />
        </Grid>
        {isEditor && (
          <Grid item xs={12}>
            <Alert severity={"info"}>
              Players and GMs in the campaigns you run will automatically be
              able to view enabled homebrew content within their character
              sheets and GM screens, but will not be allowed to edit it unless
              you add them as an editor below.
            </Alert>
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <Card variant={"outlined"} sx={{ p: 2 }}>
            <Typography variant={"h6"}>Editors</Typography>
            {isEditor && (
              <>
                <Typography color={"textSecondary"} variant={"body2"}>
                  Editors can create, update, or delete any content within this
                  collection.
                </Typography>
                <Button
                  variant={"outlined"}
                  color={"inherit"}
                  sx={{ mt: 2 }}
                  onClick={() => setInviteEditorDialogOpen(true)}
                >
                  Invite Editors
                </Button>

                <Divider sx={{ my: 2 }} />
              </>
            )}
            <Box>
              {isEditor && (
                <Typography variant={"overline"}>Editors</Typography>
              )}
              <UserList userIds={details.editors} />
            </Box>
          </Card>
        </Grid>
        {isEditor && (
          <Grid item xs={12} sm={6}>
            <Card variant={"outlined"} sx={{ p: 2 }}>
              <Typography variant={"h6"}>Viewers</Typography>
              <Typography color={"textSecondary"} variant={"body2"}>
                Viewers will be able to use this content on their own characters
                and campaigns, but will not be allowed to make any changes.
              </Typography>
              <Button
                variant={"outlined"}
                color={"inherit"}
                sx={{ mt: 2 }}
                onClick={() => handleCopy()}
              >
                Copy Viewer Link
              </Button>

              <Box mt={2}>
                <Typography color={"textSecondary"}>
                  {details.viewers?.length ?? 0} Viewers
                </Typography>
              </Box>
            </Card>
          </Grid>
        )}
      </Grid>
      {isEditor && (
        <InviteEditorDialog
          open={inviteEditorDialogOpen}
          onClose={() => setInviteEditorDialogOpen(false)}
          homebrewId={id}
        />
      )}
    </Box>
  );
}
