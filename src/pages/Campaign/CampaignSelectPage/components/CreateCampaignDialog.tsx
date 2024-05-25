import { LoadingButton } from "@mui/lab";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { useNavigate } from "react-router-dom";
import { CAMPAIGN_ROUTES, constructCampaignSheetPath } from "../../routes";
import { useStore } from "stores/store";
import { CampaignType } from "api-calls/campaign/_campaign.type";
import SoloIcon from "@mui/icons-material/Person4";
import CoopIcon from "@mui/icons-material/Group";
import GuidedIcon from "@mui/icons-material/Groups2";

const campaignTypeConfigs: Record<
  CampaignType,
  { Icon: typeof SoloIcon; title: string; description: string }
> = {
  [CampaignType.Solo]: {
    Icon: SoloIcon,
    title: "Solo",
    description:
      "A single player plays one or more characters. Text and content only useful in multiplayer campaigns is hidden.",
  },
  [CampaignType.Coop]: {
    Icon: CoopIcon,
    title: "Co-op",
    description:
      "A co-op campaign has multiple players, each playing a character, no guide required. Text and content only useful in guided campaigns is hidden.",
  },
  [CampaignType.Guided]: {
    Icon: GuidedIcon,
    title: "Guided",
    description:
      "A guide takes the role of storyteller and leads characters through the campaign. The guide has access to notes and information that players do not.",
  },
};

export interface CreateCampaignDialogProps {
  open: boolean;
  handleClose: () => void;
}

export function CreateCampaignDialog(props: CreateCampaignDialogProps) {
  const { open, handleClose } = props;
  const navigate = useNavigate();

  const createCampaign = useStore((store) => store.campaigns.createCampaign);
  const [loading, setLoading] = useState(false);
  const [label, setLabel] = useState<string>("");
  const [type, setType] = useState<CampaignType>(CampaignType.Guided);

  const handleCreate = () => {
    setLoading(true);
    createCampaign(label, type)
      .then((campaignId) => {
        navigate(constructCampaignSheetPath(campaignId, CAMPAIGN_ROUTES.SHEET));
      })
      .catch(() => {
        handleClose();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Dialog open={open} onClose={() => handleClose} maxWidth={"sm"} fullWidth>
      <DialogTitle>Create a Campaign</DialogTitle>
      <DialogContent>
        <TextField
          label={"Campaign Name"}
          value={label}
          onChange={(evt) => setLabel(evt.target.value)}
          sx={{ mt: 1 }}
        />

        <Typography variant={"subtitle1"} display={"block"} sx={{ mt: 2 }}>
          Campaign Type
        </Typography>
        <Alert severity={"info"} sx={{ mb: 1 }}>
          <AlertTitle>Campaign Types</AlertTitle>
          Campaign types tailor the experience for players and guides in
          campaigns. Solo players do not need to create a campaign, but can if
          the structure is helpful!
        </Alert>
        <Grid container spacing={2}>
          {Object.entries(campaignTypeConfigs).map(
            ([key, { Icon, title, description }]) => (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Card
                  variant={"outlined"}
                  key={key}
                  sx={{
                    height: "100%",
                    borderColor: key === type ? "primary.main" : undefined,
                  }}
                >
                  <CardActionArea
                    sx={{
                      p: 1.5,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                    }}
                    aria-selected={key === type}
                    aria-labelledby={key + "-title"}
                    onClick={() => setType(key as CampaignType)}
                  >
                    <Box display={"flex"} alignItems={"center"} sx={{ mb: 1 }}>
                      <Box
                        borderRadius={999}
                        color={
                          key === type ? "primary.contrastText" : "grey.700"
                        }
                        bgcolor={key === type ? "primary.main" : "grey.200"}
                        p={1}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"center"}
                      >
                        <Icon />
                      </Box>
                      <Typography
                        variant={"h6"}
                        sx={{ ml: 1 }}
                        id={key + "-title"}
                      >
                        {title}
                      </Typography>
                    </Box>
                    <Typography variant={"body2"} color={"textSecondary"}>
                      {description}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            )
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          color={"inherit"}
          disabled={loading}
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
        <LoadingButton
          endIcon={<SaveIcon />}
          loading={loading}
          loadingPosition={"end"}
          variant={"contained"}
          onClick={() => handleCreate()}
        >
          Create
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
