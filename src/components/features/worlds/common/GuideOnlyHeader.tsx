import { Alert } from "@mui/material";
import {
  SectionHeading,
  SectionHeadingProps,
} from "components/shared/SectionHeading";

type GuideOnlyHeaderProps = Omit<SectionHeadingProps, "label">;

export function GuideOnlyHeader(props: GuideOnlyHeaderProps) {
  return (
    <>
      <SectionHeading label={"Guide Only Section"} {...props} />
      <Alert severity="info" sx={{ mt: 2 }}>
        In guided campaigns, this information will only be visible to the guide.
        In solo or co-op campaigns, all players will be able to see this
        information.
      </Alert>
    </>
  );
}
