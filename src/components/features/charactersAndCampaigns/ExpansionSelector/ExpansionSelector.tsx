import { useGameSystemValue } from "hooks/useGameSystemValue";
import { GAME_SYSTEMS } from "types/GameSystems.type";
import { useStore } from "stores/store";
import {
  Box,
  FormControlLabel,
  FormGroup,
  Switch,
  Typography,
} from "@mui/material";
import { EmptyState } from "components/shared/EmptyState";
import { defaultExpansions } from "data/rulesets";
import { ExpansionOptions } from "types/ExpansionOptions.type";

const expansions = Object.values(defaultExpansions);

export interface ExpansionSelectorProps {
  expansionMap: Record<string, ExpansionOptions>;
  toggleEnableExpansion: (expansionId: string, enabled: boolean) => void;
  toggleExpansionCompatibility: (expansionId: string, enabled: boolean) => void;
}

export function ExpansionSelector(props: ExpansionSelectorProps) {
  const { expansionMap, toggleEnableExpansion, toggleExpansionCompatibility } = props;
  const baseRuleset = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "classic",
    [GAME_SYSTEMS.STARFORGED]: "starforged",
  });

  const homebrewExpansionMap = useStore((store) => store.homebrew.collections);
  const sortedExpansionIds = useStore(
    (store) => store.homebrew.sortedHomebrewCollectionIds
  );

  const expansionIds = sortedExpansionIds.filter(
    (expansionId) =>
      homebrewExpansionMap[expansionId]?.base?.rulesetId === baseRuleset
  );

  const notFoundExpansionIds = Object.keys(expansionMap).filter(
    (key) =>
      !expansions.some((expansion) => expansion._id === key) &&
      !expansionIds.includes(key)
  );

  return (
    <Box>
      {expansions.length > 0 && (
        <Box>
          <Typography variant={"overline"}>Official Expansions</Typography>
          <FormGroup>
            {expansions.map((expansion) => (
              <Box key={expansion._id} display={"flex"} flexDirection={"row"}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={
                        expansionMap[expansion._id] === ExpansionOptions.ENABLED ||
                        expansionMap[expansion._id] === ExpansionOptions.COMPATIBILITY
                      }
                      onChange={(evt, checked) => {
                        toggleEnableExpansion(expansion._id, checked)
                      }}
                    />
                  }
                  label={expansion.title ?? "Unnamed Expansion"}
                />
                <FormControlLabel
                  control={
                    <Switch
                      disabled={
                        !expansionMap[expansion._id] ||
                        expansionMap[expansion._id] === ExpansionOptions.DISABLED
                      }
                      checked={expansionMap[expansion._id] === ExpansionOptions.COMPATIBILITY}
                      onChange={(evt, checked) =>
                        toggleExpansionCompatibility(expansion._id, checked)
                      }
                    />
                  }
                  label={"Enforce compatibility"}
                />
              </Box>
            ))}
          </FormGroup>
        </Box>
      )}
      <Box mt={expansions.length > 0 ? 4 : 0}>
        <Typography variant={"overline"}>Homebrew Expansions</Typography>
        {expansionIds.length > 0 ? (
          <FormGroup>
            {expansionIds.map((expansionId) => (
              <FormControlLabel
                key={expansionId}
                control={
                  <Switch
                    checked={expansionMap[expansionId] !== ExpansionOptions.DISABLED}
                    onChange={(evt, checked) =>
                      toggleEnableExpansion(expansionId, checked)
                    }
                  />
                }
                label={
                  homebrewExpansionMap[expansionId]?.base?.title ?? "Loading"
                }
              />
            ))}
            {notFoundExpansionIds.map((expansionId) => (
              <FormControlLabel
                key={expansionId}
                control={
                  <Switch
                    checked={expansionMap[expansionId] !== ExpansionOptions.DISABLED}
                    onChange={(evt, checked) =>
                      toggleEnableExpansion(expansionId, checked)
                    }
                  />
                }
                label={
                  homebrewExpansionMap[expansionId]?.base?.title ??
                  "Deleted Homebrew Expansion"
                }
              />
            ))}
          </FormGroup>
        ) : (
          <EmptyState leftAlign message={"No homebrew expansions found"} />
        )}
      </Box>
    </Box>
  );
}
