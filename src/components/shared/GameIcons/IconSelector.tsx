import {
  Box,
  Card,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { useSearch } from "hooks/useSearch";
import { IconList } from "./IconList";
import { Link } from "react-router-dom";

export interface IconSelectorProps {
  setSelectedIcon: (iconKey: string) => void;
  sx?: SxProps<Theme>;
}

export function IconSelector(props: IconSelectorProps) {
  const { setSelectedIcon, sx } = props;

  const { search, setSearch, debouncedSearch } = useSearch();

  return (
    <>
      <Card variant={"outlined"} sx={sx}>
        <TextField
          variant={"standard"}
          label={"Filter Icons"}
          value={search}
          onChange={(evt) => setSearch(evt.target.value)}
          sx={{ ml: 2 }}
        />

        <Box sx={{ pl: 2, borderTop: `1px solid`, borderColor: "divider" }}>
          <IconList nameFilter={debouncedSearch} onClick={setSelectedIcon} />
        </Box>
      </Card>
      <Typography variant={"caption"}>
        Icons provided by <Link to={"https://game-icons.net/"}>Game Icons</Link>{" "}
        under the{" "}
        <Link to={"https://creativecommons.org/licenses/by/3.0/"}>
          CC BY 3.0 License
        </Link>
      </Typography>
    </>
  );
}
