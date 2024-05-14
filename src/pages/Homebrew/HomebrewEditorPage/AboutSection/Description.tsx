import { Box } from "@mui/material";
import { MarkdownEditor } from "components/shared/RichTextEditor/MarkdownEditor";
import { useState } from "react";
import { useStore } from "stores/store";

export interface DescriptionProps {
  expansionId: string;
  description?: string;
}

export function Description(props: DescriptionProps) {
  const { expansionId, description } = props;
  const updateDetails = useStore((store) => store.homebrew.updateExpansion);

  const [localDescription, setLocalDescription] = useState(description ?? "");

  const handleSave = () => {
    updateDetails(expansionId, { description: localDescription });
  };

  return (
    <Box maxWidth={(theme) => theme.breakpoints.values.md}>
      <MarkdownEditor
        label={"Description"}
        content={localDescription ?? ""}
        onChange={(value) => setLocalDescription(value)}
        onBlur={handleSave}
      />
    </Box>
  );
}
