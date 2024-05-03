import {
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  FormGroup,
  Stack,
} from "@mui/material";
import { HomebrewImpactCategoryDocument } from "api-calls/homebrew/rules/impacts/_homebrewImpacts.type";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownRenderer } from "components/shared/MarkdownRenderer";

export interface ImpactPreviewDialogProps {
  open: boolean;
  onClose: () => void;
  impactCategory: HomebrewImpactCategoryDocument;
}

export function ImpactPreviewDialog(props: ImpactPreviewDialogProps) {
  const { open, onClose, impactCategory } = props;

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        {impactCategory.label}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <Stack spacing={2}>
          {impactCategory.description && (
            <MarkdownRenderer markdown={impactCategory.description} />
          )}
          <FormGroup>
            {Object.keys(impactCategory.contents).map((debilityKey) => (
              <FormControlLabel
                key={debilityKey}
                control={<Checkbox />}
                sx={{ textTransform: "capitalize" }}
                label={impactCategory.contents[debilityKey].label}
              />
            ))}
          </FormGroup>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
