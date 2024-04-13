import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownEditor } from "components/shared/RichTextEditor/MarkdownEditor";
import { convertIdPart } from "functions/dataswornIdEncoder";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "stores/store";
import {
  StoredHomebrewAsset,
  StoredHomebrewAssetAbility,
  StoredHomebrewAssetOption,
} from "types/homebrew/HomebrewAssets.type";
import { AssetAutocomplete } from "./AssetAutocomplete";
import { Preview } from "../../Preview";
import { AssetCardPreview } from "./AssetCardPreview";
import { SectionHeading } from "components/shared/SectionHeading";
import { AssetAbilities } from "./AssetAbilities";
import { AssetOptions } from "./AssetOptions";

export interface AssetDialogFormProps {
  homebrewId: string;
  existingAssetId?: string;
  onClose: () => void;
}

export interface Form {
  label: string;
  categoryId: string;
  requirement?: string;
  replacesId?: string;
  abilities: StoredHomebrewAssetAbility[];
  options: StoredHomebrewAssetOption[];
}

export function AssetDialogForm(props: AssetDialogFormProps) {
  const { homebrewId, existingAssetId, onClose } = props;

  const assets = useStore(
    (store) => store.homebrew.collections[homebrewId]?.assets?.data ?? {}
  );

  const existingAsset = existingAssetId ? assets[existingAssetId] : undefined;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, disabled },
    control,
  } = useForm<Form>({
    disabled: loading,
    defaultValues: existingAsset
      ? {
          label: existingAsset.label,
          categoryId: existingAsset.categoryKey,
          requirement: existingAsset.requirement,
          replacesId: existingAsset.replacesId,
          abilities: existingAsset.abilities,
          options: existingAsset.options,
        }
      : {},
  });

  const createAsset = useStore((store) => store.homebrew.createAsset);
  const updateAsset = useStore((store) => store.homebrew.updateAsset);

  const onSubmit: SubmitHandler<Form> = (values) => {
    setLoading(true);

    const asset: StoredHomebrewAsset = {
      collectionId: homebrewId,
      categoryKey: values.categoryId,
      label: values.label,
      abilities: values.abilities,
    };

    if (values.requirement) {
      asset.requirement = values.requirement;
    }
    if (values.options) {
      asset.options = values.options;
    }

    if (existingAssetId) {
      updateAsset(existingAssetId, asset)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      createAsset(asset)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  return (
    <>
      <DialogTitleWithCloseButton onClose={onClose}>
        {existingAsset ? `Edit ${existingAsset.label}` : "Create Asset"}
      </DialogTitleWithCloseButton>
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          flexGrow: 1,
          overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <DialogContent
          sx={{ overflowY: "hidden", flexGrow: 1, display: "flex" }}
        >
          <Grid container spacing={1} sx={{ maxHeight: "100%" }}>
            <Grid
              item
              xs={12}
              md={8}
              sx={{
                overflowY: "auto",
                overflowX: "hidden",
                pr: 1,
                maxHeight: "100%",
              }}
            >
              <Stack spacing={2} sx={{ flexGrow: 1 }}>
                <SectionHeading floating label={"Base Asset Info"} />
                <TextField
                  disabled={disabled}
                  label={"Asset Label"}
                  fullWidth
                  error={touchedFields.label && !!errors.label}
                  required
                  helperText={
                    touchedFields.label && errors.label
                      ? errors.label.message
                      : undefined
                  }
                  inputProps={{
                    defaultValue: "",
                    ...register("label", {
                      required: "This field is required.",
                      validate: (value) => {
                        if (!existingAssetId && value) {
                          try {
                            const id = convertIdPart(value);
                            if (assets[id]) {
                              return `You already have an asset with id ${id}. Please try a different label.`;
                            }
                          } catch (e) {
                            return "Failed to parse a valid ID for your Asset. Please use at least three letters or numbers in your label.";
                          }
                        }
                      },
                    }),
                  }}
                />
                <Controller
                  name="requirement"
                  control={control}
                  render={({ field }) => (
                    <MarkdownEditor
                      label={"Asset Requirements"}
                      content={field.value ?? ""}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
                <Controller
                  name={"replacesId"}
                  control={control}
                  render={({ field }) => (
                    <AssetAutocomplete
                      label={"Replaces Asset"}
                      value={field.value}
                      onChange={(ids) => field.onChange(ids)}
                      onBlur={field.onBlur}
                      helperText={"Replaces an existing asset with this one"}
                    />
                  )}
                />
                <AssetOptions
                  control={control}
                  register={register}
                  disabled={disabled}
                />
                <AssetAbilities
                  control={control}
                  register={register}
                  disabled={disabled}
                />
                <SectionHeading
                  floating
                  label={"Controls"}
                  action={
                    <Button variant={"outlined"} color={"inherit"}>
                      Add Control
                    </Button>
                  }
                />
              </Stack>
            </Grid>
            <Grid item xs={12} md={4}>
              <Preview>
                <AssetCardPreview control={control} />
              </Preview>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button type={"reset"} color={"inherit"} onClick={onClose}>
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} onClick={() => {}}>
            Save
          </Button>
        </DialogActions>
      </Box>
    </>
  );
}
