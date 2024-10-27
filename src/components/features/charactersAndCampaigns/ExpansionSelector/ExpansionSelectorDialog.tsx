import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { useEffect, useState } from "react";
import { ExpansionSelector } from "./ExpansionSelector";
import { useStore } from "stores/store";
import { ExpansionOptions } from "types/ExpansionOptions.type";

export interface ExpansionSelectorDialogProps {
  open: boolean;
  onClose: () => void;
}

export function ExpansionSelectorDialog(props: ExpansionSelectorDialogProps) {
  const { open, onClose } = props;

  const characterId = useStore(
    (store) => store.characters.currentCharacter.currentCharacterId
  );
  const campaignId = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaignId
  );

  const characterHomebrewIds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.expansionIds
  );
  const campaignHomebrewIds = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.expansionIds
  );
  const characterCompatibilityIds = useStore(
    (store) => store.characters.currentCharacter.currentCharacter?.compatibilityExpansionIds
  );
  const campaignCompatibilityIds = useStore(
    (store) => store.campaigns.currentCampaign.currentCampaign?.compatibilityExpansionIds
  );

  const [expansionOptions, setExpansionOptions] = useState<
    Record<string, ExpansionOptions>
  >({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const expansions: Record<string, ExpansionOptions> = {};

    if (campaignId) {
      campaignHomebrewIds?.forEach((homebrewId) => {
        expansions[homebrewId] = ExpansionOptions.ENABLED;
      });
      campaignCompatibilityIds?.forEach((expansionId) => {
        expansions[expansionId] = ExpansionOptions.COMPATIBILITY;
      });
    } else if (characterId) {
      characterHomebrewIds?.forEach((homebrewId) => {
        expansions[homebrewId] = ExpansionOptions.ENABLED;
      });
      characterCompatibilityIds?.forEach((expansionId) => {
        expansions[expansionId] = ExpansionOptions.COMPATIBILITY;
      });
    }

    setExpansionOptions(expansions);
  }, [
    characterId,
    campaignId,
    characterHomebrewIds,
    campaignHomebrewIds,
    characterCompatibilityIds,
    campaignCompatibilityIds,
    open
  ]);

  const toggleEnableExpansion = (expansionId: string, enabled: boolean) => {
    setExpansionOptions((prev) => ({
      ...prev,
      [expansionId]: enabled ? ExpansionOptions.ENABLED : ExpansionOptions.DISABLED
    }));
  };
  const toggleExpansionCompatibility = (expansionId: string, enabled: boolean) => {
    setExpansionOptions((prev) => ({
      ...prev,
      [expansionId]: enabled ? ExpansionOptions.COMPATIBILITY : ExpansionOptions.ENABLED
    }));
  };

  const updateCurrentCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );
  const updateCurrentCampaign = useStore(
    (store) => store.campaigns.currentCampaign.updateCampaign
  );

  const handleSave = () => {
    setLoading(true);
    const expansionIds = Object.keys(expansionOptions).filter(
      (expansionId) =>
        expansionOptions[expansionId] === ExpansionOptions.ENABLED ||
        expansionOptions[expansionId] === ExpansionOptions.COMPATIBILITY
    );
    const compatibilityExpansionIds = Object.keys(expansionOptions).filter(
      (expansionId) => expansionOptions[expansionId] === ExpansionOptions.COMPATIBILITY
    );

    if (campaignId) {
      updateCurrentCampaign({ expansionIds, compatibilityExpansionIds })
        .then(() => {
          onClose();
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else if (characterId) {
      updateCurrentCharacter({ expansionIds, compatibilityExpansionIds })
        .then(() => {
          onClose();
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } else {
      onClose();
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth={"xs"} fullWidth>
      <DialogTitleWithCloseButton onClose={onClose}>
        Expansions & Homebrew
      </DialogTitleWithCloseButton>
      <DialogContent>
        <ExpansionSelector
          expansionMap={expansionOptions}
          toggleEnableExpansion={toggleEnableExpansion}
          toggleExpansionCompatibility={toggleExpansionCompatibility}
        />
      </DialogContent>
      <DialogActions>
        <Button color={"inherit"} onClick={() => onClose()} disabled={loading}>
          Cancel
        </Button>
        <Button variant={"contained"} disabled={loading} onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
