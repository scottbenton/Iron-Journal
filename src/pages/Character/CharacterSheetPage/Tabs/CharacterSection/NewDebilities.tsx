import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import { SectionHeading } from "components/shared/SectionHeading";
import { useGameSystemValue } from "hooks/useGameSystemValue";
import { useStore } from "stores/store";
import { GAME_SYSTEMS } from "types/GameSystems.type";

export function NewDebilities() {
  const impacts = useStore((store) => store.rules.impacts);

  const debilityChecks = useStore(
    (store) =>
      store.characters.currentCharacter.currentCharacter?.debilities ?? {}
  );
  const updateCharacter = useStore(
    (store) => store.characters.currentCharacter.updateCurrentCharacter
  );

  const updateDebility = (debilityKey: string, active: boolean) => {
    updateCharacter({ [`debilities.${debilityKey}`]: active }).catch(() => {});
  };

  const impactsLabel = useGameSystemValue({
    [GAME_SYSTEMS.IRONSWORN]: "Debilities",
    [GAME_SYSTEMS.STARFORGED]: "Impacts",
  });

  return (
    <>
      <SectionHeading label={impactsLabel} />
      <Box px={2}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
        >
          {Object.keys(impacts).map((impactCategoryKey) => (
            <FormControl
              key={impactCategoryKey}
              component="fieldset"
              variant="standard"
            >
              <FormLabel
                component="legend"
                sx={{ textTransform: "capitalize" }}
              >
                {impacts[impactCategoryKey].label}
              </FormLabel>
              <FormGroup>
                {Object.keys(impacts[impactCategoryKey].contents).map(
                  (debilityKey) => (
                    <FormControlLabel
                      key={debilityKey}
                      control={
                        <Checkbox
                          checked={debilityChecks[debilityKey] ?? false}
                          onChange={(evt, checked) =>
                            updateDebility(debilityKey, checked)
                          }
                          name={
                            impacts[impactCategoryKey].contents[debilityKey]
                              .label
                          }
                        />
                      }
                      sx={{ textTransform: "capitalize" }}
                      label={
                        impacts[impactCategoryKey].contents[debilityKey].label
                      }
                    />
                  )
                )}
              </FormGroup>
            </FormControl>
          ))}
        </Box>
      </Box>
    </>
  );
}
