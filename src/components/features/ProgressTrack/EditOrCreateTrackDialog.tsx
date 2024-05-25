import {
  Alert,
  AlertTitle,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";
import {
  ProgressTrack,
  Difficulty,
  TrackStatus,
  TrackSectionProgressTracks,
  TrackTypes,
  SceneChallenge,
} from "types/Track.type";

export interface EditOrCreateTrackDialogProps {
  open: boolean;
  handleClose: () => void;
  initialTrack?: ProgressTrack | SceneChallenge;
  trackType: TrackSectionProgressTracks | TrackTypes.SceneChallenge;
  trackTypeName: string;
  handleTrack: (
    track: ProgressTrack | SceneChallenge
  ) => Promise<boolean | void>;
}

export function EditOrCreateTrackDialog(props: EditOrCreateTrackDialogProps) {
  const {
    open,
    handleClose,
    initialTrack,
    trackType,
    trackTypeName,
    handleTrack,
  } = props;

  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const [title, setTitle] = useState(initialTrack?.label ?? "");
  const [description, setDescription] = useState(
    initialTrack?.description ?? ""
  );
  const [difficulty, setDifficulty] = useState<Difficulty | undefined>(
    initialTrack?.difficulty
  );
  const [resetProgress, setResetProgress] = useState(false);

  const handleDialogClose = () => {
    setTitle("");
    setDescription("");
    setDifficulty(undefined);
    setError(undefined);
    setLoading(false);
    handleClose();
  };

  const handleSubmit = () => {
    if (!title) {
      setError("Title is required");
      return;
    } else if (!difficulty) {
      setError("Difficulty is required");
      return;
    }

    const track: ProgressTrack | SceneChallenge =
      trackType === TrackTypes.SceneChallenge
        ? {
            createdDate: new Date(),
            status: TrackStatus.Active,
            type: trackType,
            ...((initialTrack as SceneChallenge | undefined) ?? {}),
            label: title,
            description,
            difficulty: difficulty,
            value: initialTrack && !resetProgress ? initialTrack.value : 0,
            segmentsFilled: 0,
          }
        : {
            createdDate: new Date(),
            status: TrackStatus.Active,
            type: trackType,
            ...((initialTrack as ProgressTrack | undefined) ?? {}),
            label: title,
            description,
            difficulty: difficulty,
            value: initialTrack && !resetProgress ? initialTrack.value : 0,
          };

    setLoading(true);
    handleTrack(track)
      .then(() => {
        handleDialogClose();
      })
      .catch(() => {
        setLoading(false);
        setError("Error adding track");
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleDialogClose} maxWidth={"xs"} fullWidth>
        <DialogTitle>
          {initialTrack ? `Edit ${initialTrack.label}` : `Add ${trackTypeName}`}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                {error}
              </Alert>
            )}
            <TextField
              label={"Title"}
              required
              value={title}
              onChange={(evt) => setTitle(evt.target.value)}
              sx={{ mt: 1 }}
            />
            <TextField
              label={"Description"}
              value={description}
              onChange={(evt) => setDescription(evt.target.value)}
              multiline
              minRows={3}
            />
            <TextField
              label={"Difficulty"}
              value={difficulty ?? "-1"}
              onChange={(evt) => setDifficulty(evt.target.value as Difficulty)}
              multiline
              required
              select
            >
              <MenuItem value={"-1"} disabled></MenuItem>

              <MenuItem value={Difficulty.Troublesome}>Troublesome</MenuItem>
              <MenuItem value={Difficulty.Dangerous}>Dangerous</MenuItem>
              <MenuItem value={Difficulty.Formidable}>Formidable</MenuItem>
              <MenuItem value={Difficulty.Extreme}>Extreme</MenuItem>
              <MenuItem value={Difficulty.Epic}>Epic</MenuItem>
            </TextField>
            {initialTrack && initialTrack.difficulty !== difficulty && (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={resetProgress}
                    onChange={(evt, value) => setResetProgress(value)}
                  />
                }
                label={"Reset Track Progress"}
                sx={{ textTransform: "capitalize", marginRight: 3 }}
              />
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={loading}
            onClick={() => handleDialogClose()}
            color={"inherit"}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={() => handleSubmit()}
            variant={"contained"}
          >
            {initialTrack
              ? `Edit ${initialTrack.label}`
              : `Add ${trackTypeName}`}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
