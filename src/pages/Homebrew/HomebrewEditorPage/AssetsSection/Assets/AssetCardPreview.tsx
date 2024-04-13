import { Control, useWatch } from "react-hook-form";
import { Form } from "./AssetDialogForm";
import { Box, Card } from "@mui/material";
import { Datasworn } from "@datasworn/core";
import { AssetHeader } from "components/features/assets/NewAssetCard/AssetHeader";
import { AssetNameAndDescription } from "components/features/assets/NewAssetCard/AssetNameAndDescription";
import { AssetAbilities } from "components/features/assets/NewAssetCard/AssetAbilities";
import { AssetOptions } from "components/features/assets/NewAssetCard/AssetOptions";

export interface AssetCardPreviewProps {
  control: Control<Form, unknown>;
}

export function AssetCardPreview(props: AssetCardPreviewProps) {
  const { control } = props;

  const label = useWatch({ control, name: "label" });
  const requirement = useWatch({ control, name: "requirement" });
  const abilities = useWatch({ control, name: "abilities", defaultValue: [] });
  const options = useWatch({ control, name: "options", defaultValue: [] });

  const dataswornAbilities: Datasworn.AssetAbility[] = abilities.map(
    (ability, index) => ({
      _id: index + "",
      text: ability.text,
      name: ability.name,
      enabled: ability.defaultEnabled ?? false,
    })
  );

  const dataswornOptions: Record<string, Datasworn.AssetOptionField> = {};
  options.forEach((option, index) => {
    if (option.type === "text") {
      dataswornOptions[option.label + index] = {
        label: option.label,
        field_type: "text",
        value: "",
      };
    } else {
      const choices: Record<string, Datasworn.SelectEnhancementFieldChoice> =
        {};

      (option.options ?? []).forEach((optionChoice, index) => {
        choices[optionChoice + index] = {
          label: optionChoice,
          choice_type: "choice",
        };
      });

      dataswornOptions[option.label + index] = {
        label: option.label,
        field_type: "select_enhancement",
        value: "",
        choices,
      };
    }
  });

  const asset: Datasworn.Asset = {
    _id: "",
    name: label,
    count_as_impact: false,
    shared: false,
    _source: { title: "", authors: [], date: "", url: "", license: "" },

    requirement: requirement,
    category: "Collection",
    abilities: dataswornAbilities,
    options: dataswornOptions,
  };

  return (
    <Card
      variant={"outlined"}
      sx={{
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderWidth: 0,
      }}
    >
      <AssetHeader asset={asset} />
      <Box
        flexGrow={1}
        display={"flex"}
        flexDirection={"column"}
        p={1}
        border={(theme) => `1px solid ${theme.palette.divider}`}
        sx={(theme) => ({
          borderBottomLeftRadius: theme.shape.borderRadius,
          borderBottomRightRadius: theme.shape.borderRadius,
        })}
      >
        <AssetNameAndDescription asset={asset} />
        <AssetOptions asset={asset} onAssetOptionChange={() => {}} />
        <AssetAbilities asset={asset} />
      </Box>
    </Card>
  );
}
