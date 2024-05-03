import {
  Button,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import { DialogTitleWithCloseButton } from "components/shared/DialogTitleWithCloseButton";
import { MarkdownEditor } from "components/shared/RichTextEditor/MarkdownEditor";
import { convertIdPart } from "functions/dataswornIdEncoder";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useStore } from "stores/store";
import { HomebrewAssetCollectionDocument } from "api-calls/homebrew/assets/collections/_homebrewAssetCollection.type";

import { AssetCollectionAutocomplete } from "./AssetCollectionAutocomplete";

export interface AssetCollectionFormDialogProps {
  homebrewId: string;
  existingAssetCollectionId?: string;
  onClose: () => void;
}

interface Form {
  label: string;
  description?: string;
  replacesId?: string;
  enhancesId?: string;
}

export function AssetCollectionDialogForm(
  props: AssetCollectionFormDialogProps
) {
  const { homebrewId, existingAssetCollectionId, onClose } = props;

  const assetCollections = useStore(
    (store) =>
      store.homebrew.collections[homebrewId]?.assetCollections?.data ?? {}
  );

  const existingAssetCollection = existingAssetCollectionId
    ? assetCollections[existingAssetCollectionId]
    : undefined;

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, disabled },
    control,
  } = useForm<Form>({
    disabled: loading,
    defaultValues: existingAssetCollection
      ? {
          label: existingAssetCollection.label,
          description: existingAssetCollection.description,
          replacesId: existingAssetCollection.replacesId,
          enhancesId: existingAssetCollection.enhancesId,
        }
      : {},
  });

  const createAssetCollection = useStore(
    (store) => store.homebrew.createAssetCollection
  );
  const updateAssetCollection = useStore(
    (store) => store.homebrew.updateAssetCollection
  );

  const onSubmit: SubmitHandler<Form> = (values) => {
    setLoading(true);

    const assetCollection: HomebrewAssetCollectionDocument = {
      collectionId: homebrewId,
      label: values.label,
    };

    if (values.description) {
      assetCollection.description = values.description;
    }
    if (values.enhancesId) {
      assetCollection.enhancesId = values.enhancesId;
    }
    if (values.replacesId) {
      assetCollection.replacesId = values.replacesId;
    }

    if (existingAssetCollectionId) {
      updateAssetCollection(existingAssetCollectionId, assetCollection)
        .then(() => {
          setLoading(false);
          onClose();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      createAssetCollection(assetCollection)
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
        {existingAssetCollection
          ? `Edit ${existingAssetCollection.label}`
          : "Create Asset Collection"}
      </DialogTitleWithCloseButton>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              disabled={disabled}
              label={"Category Label"}
              fullWidth
              error={touchedFields.label && !!errors.label}
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
                    if (!existingAssetCollectionId && value) {
                      try {
                        const id = convertIdPart(value);
                        if (assetCollections[id]) {
                          return `You already have an asset collection with id ${id}. Please try a different label.`;
                        }
                      } catch (e) {
                        return "Failed to parse a valid ID for your Asset Collection. Please use at least three letters or numbers in your label.";
                      }
                    }
                  },
                }),
              }}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MarkdownEditor
                  label={"Description"}
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
                <AssetCollectionAutocomplete
                  label={"Replaces Collection"}
                  value={field.value}
                  onChange={(ids) => field.onChange(ids ?? null)}
                  onBlur={field.onBlur}
                  helperText={
                    "Replaces the collection (and all assets within) with this collection"
                  }
                />
              )}
            />
            <Controller
              name={"enhancesId"}
              control={control}
              render={({ field }) => (
                <AssetCollectionAutocomplete
                  label={"Enhances Collection"}
                  value={field.value}
                  onChange={(ids) => field.onChange(ids ?? null)}
                  onBlur={field.onBlur}
                  helperText={
                    "Adds assets in this collection to the entered collection"
                  }
                />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button type={"reset"} color={"inherit"} onClick={onClose}>
            Cancel
          </Button>
          <Button type={"submit"} variant={"contained"} onClick={() => {}}>
            Save
          </Button>
        </DialogActions>
      </form>
    </>
  );
}
