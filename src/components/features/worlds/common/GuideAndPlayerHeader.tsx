import { Alert } from "@mui/material";
import {
  SectionHeading,
  SectionHeadingProps,
} from "components/shared/SectionHeading";

type GuideAndPlayerHeaderProps = Omit<SectionHeadingProps, "label">;

export function GuideAndPlayerHeader(props: GuideAndPlayerHeaderProps) {
  return (
    <>
      <SectionHeading label={"Guide & Player Section"} {...props} />
      <Alert severity={"info"} sx={{ mt: 2 }}>
        Notes in this section will only be visible to guides & players in guided
        campaigns. Notes for solo or co-op games should go in the above section.
      </Alert>
    </>
  );
}
