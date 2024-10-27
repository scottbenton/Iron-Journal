import { Control, Controller } from "react-hook-form";
import { Form } from "../CharacterCreatePageContent";
import { SectionHeading } from "components/shared/SectionHeading";
import { ExpansionSelector } from "components/features/charactersAndCampaigns/ExpansionSelector";
import { ExpansionOptions } from "types/ExpansionOptions.type";

export interface CharacterDetailsProps {
  control: Control<Form>;
}

export function ExpansionsAndHomebrew(props: CharacterDetailsProps) {
  const { control } = props;

  return (
    <>
      <SectionHeading breakContainer label={"Expansions & Homebrew"} />
      <Controller
        name={"expansionMap"}
        control={control}
        defaultValue={{}}
        render={({ field }) => (
          <ExpansionSelector
            expansionMap={field.value}
            toggleEnableExpansion={(expansionId, enabled) =>
              field.onChange({
                ...field.value,
                [expansionId]: enabled ? ExpansionOptions.ENABLED : ExpansionOptions.DISABLED
              })
            }
            toggleExpansionCompatibility={(expansionId, enabled) =>
              field.onChange({
                ...field.value,
                [expansionId]: enabled ? ExpansionOptions.COMPATIBILITY : ExpansionOptions.ENABLED
              })
            }
          />
        )}
      />
    </>
  );
}
