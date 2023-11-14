import { Box, Input, InputAdornment, Typography } from "@mui/material";
import { OracleCategory } from "./OracleCategory";
import SearchIcon from "@mui/icons-material/Search";
import { useFilterOracles } from "./useFilterOracles";
import { useStore } from "stores/store";
import { AskTheOracleButtons } from "./AskTheOracleButtons";

export function OracleSection() {
  const pinnedOracles = useStore((store) => store.settings.pinnedOraclesIds);
  const { search, filteredOracles, setSearch } = useFilterOracles();

  return (
    <>
      <Box
        color={(theme) => theme.palette.darkGrey.contrastText}
        bgcolor={(theme) => theme.palette.darkGrey.dark}
        borderBottom={(theme) => `1px solid ${theme.palette.darkGrey.dark}`}
      >
        <Typography
          variant={"body2"}
          component={"div"}
          textAlign={"center"}
          fontFamily={(theme) => theme.fontFamilyTitle}
        >
          Ask the Oracle
        </Typography>
        <AskTheOracleButtons />
      </Box>

      <Input
        fullWidth
        startAdornment={
          <InputAdornment position={"start"}>
            <SearchIcon sx={(theme) => ({ color: theme.palette.grey[300] })} />
          </InputAdornment>
        }
        aria-label={"Filter Oracles"}
        placeholder={"Filter Oracles"}
        value={search}
        onChange={(evt) => setSearch(evt.target.value)}
        color={"primary"}
        sx={(theme) => ({
          backgroundColor: theme.palette.darkGrey.main,
          color: "#fff",
          px: 2,
          borderBottomColor: theme.palette.darkGrey.light,
        })}
      />
      <Box sx={{ overflow: "auto", flexGrow: 1 }}>
        {filteredOracles.map((category, index) => (
          <OracleCategory
            category={category}
            key={index}
            pinnedCategories={pinnedOracles}
          />
        ))}
      </Box>
    </>
  );
}
