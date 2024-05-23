import { Button, Stack, Typography } from "@mui/material";
import { LinkComponent } from "components/shared/LinkComponent";

export function HomebrewUpdate() {
  return (
    <Stack spacing={2}>
      <Typography>
        Your homebrew content has moved. The homebrew page is now your one-stop
        library for homebrew content, including moves, oracles, assets, and
        more.
      </Typography>
      <Stack direction={"row"} spacing={1} justifyContent={"center"}>
        <Button
          color={"inherit"}
          LinkComponent={LinkComponent}
          href={"https://scottbenton.dev/blog/if-cl-3-release-notes"}
        >
          Learn More
        </Button>
        <Button
          color={"inherit"}
          variant={"outlined"}
          LinkComponent={LinkComponent}
          href={"/homebrew"}
        >
          Visit your Homebrew Library
        </Button>
      </Stack>
    </Stack>
  );
}
