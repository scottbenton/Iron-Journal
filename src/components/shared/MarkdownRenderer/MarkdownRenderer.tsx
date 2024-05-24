import {
  Box,
  Link,
  SxProps,
  Theme,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useStore } from "stores/store";
import { OracleTableRenderer } from "./OracleTableRenderer";

export interface MarkdownRendererProps {
  inlineParagraph?: boolean;
  markdown: string;
  inheritColor?: boolean;
  disableLinks?: boolean;
  typographyVariant?: TypographyProps["variant"];
  sx?: SxProps<Theme>;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
  const {
    inlineParagraph,
    markdown,
    inheritColor,
    disableLinks,
    typographyVariant,
    sx,
  } = props;

  const openDialog = useStore((store) => store.appState.openDialog);

  const theme = useTheme();

  const newOracleMap = useStore(
    (store) => store.rules.oracleMaps.allOraclesMap
  );
  const newMoveMap = useStore((store) => store.rules.moveMaps.moveMap);
  const assetMap = useStore((store) => store.rules.assetMaps.assetMap);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => {
          if (
            typeof children === "string" ||
            (Array.isArray(children) &&
              children.length > 0 &&
              typeof children[0] === "string")
          ) {
            const content =
              typeof children === "string" ? children : (children[0] as string);
            if (content.match(/^{{table:[^/]+\/oracles\/[^}]+}}$/)) {
              const id = content.replace("{{table:", "").replace("}}", "");
              const oracle = newOracleMap[id];
              if (oracle) {
                return <OracleTableRenderer oracle={oracle} />;
              }
            } else if (content.match(/^{{table:[^/]+\/truths\/[^}]+}}$/)) {
              return null;
            }
          }
          return (
            <Typography
              variant={typographyVariant ?? "body2"}
              display={inlineParagraph ? "inline" : "block"}
              color={
                inheritColor
                  ? "inherit"
                  : (theme) =>
                      inlineParagraph
                        ? theme.palette.text.secondary
                        : theme.palette.text.primary
              }
              py={inlineParagraph ? 0 : 1}
              textAlign={"left"}
              whiteSpace={"pre-wrap"}
              sx={sx}
            >
              {children}
            </Typography>
          );
        },
        li: ({ children }) => (
          <Typography
            component={"li"}
            variant={typographyVariant ?? "body2"}
            color={
              inheritColor
                ? "inherit"
                : (theme) =>
                    inlineParagraph
                      ? theme.palette.text.secondary
                      : theme.palette.text.primary
            }
            sx={sx}
          >
            {children}
          </Typography>
        ),
        ul: ({ children }) => (
          <Box component={"ul"} pl={1.5} sx={sx}>
            {children}
          </Box>
        ),
        table: ({ children }) => (
          <Box
            component={"table"}
            mt={2}
            mb={1}
            border={1}
            borderColor={(theme) => theme.palette.divider}
            borderRadius={(theme) => `${theme.shape.borderRadius}px`}
            sx={[
              { borderCollapse: "collapse" },
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {children}
          </Box>
        ),
        thead: ({ children }) => (
          <Box
            component={"thead"}
            bgcolor={(theme) => theme.palette.background.paperInlayDarker}
            sx={sx}
          >
            {children}
          </Box>
        ),
        th: ({ children }) => (
          <Typography
            component={"th"}
            variant={typographyVariant ?? "body2"}
            textAlign={"left"}
            p={1}
            minWidth={"8ch"}
            sx={sx}
          >
            <b>{children}</b>
          </Typography>
        ),
        tr: ({ children }) => (
          <Box
            component={"tr"}
            sx={[
              (theme) => ({
                "&:nth-of-type(even)": {
                  backgroundColor: theme.palette.background.paperInlay,
                },
              }),
              ...(Array.isArray(sx) ? sx : [sx]),
            ]}
          >
            {children}
          </Box>
        ),
        td: ({ children }) => (
          <Typography
            component={"td"}
            px={1}
            py={0.5}
            variant={typographyVariant ?? "body2"}
            color={(theme) => theme.palette.text.primary}
            sx={sx}
          >
            {children}
          </Typography>
        ),
        a: (linkProps) => {
          if (disableLinks) {
            return <>{linkProps.children}</>;
          }

          const propertiesHref = linkProps.node?.properties?.href;

          const href = typeof propertiesHref === "string" ? propertiesHref : "";
          // V2 versions
          if (href.startsWith("id:")) {
            const strippedHref = href.slice(3);
            if (newOracleMap[strippedHref]) {
              return (
                <Link
                  component={"button"}
                  type={"button"}
                  sx={[
                    {
                      cursor: "pointer",
                      verticalAlign: "baseline",
                    },
                    ...(Array.isArray(sx) ? sx : [sx]),
                  ]}
                  color={
                    theme.palette.mode === "light" ? "info.dark" : "info.light"
                  }
                  onClick={() => openDialog(strippedHref)}
                >
                  {linkProps.children}
                </Link>
              );
            }
            if (href.match(/^id:[^/]*\/moves/)) {
              const strippedHref = href.slice(3);
              if (newMoveMap[strippedHref]) {
                return (
                  <Link
                    component={"button"}
                    type={"button"}
                    sx={[
                      {
                        cursor: "pointer",
                        verticalAlign: "baseline",
                      },
                      ...(Array.isArray(sx) ? sx : [sx]),
                    ]}
                    color={
                      theme.palette.mode === "light"
                        ? "info.dark"
                        : "info.light"
                    }
                    onClick={() => openDialog(strippedHref)}
                  >
                    {linkProps.children}
                  </Link>
                );
              }
            }
            if (href.match(/^id:[^/]*\/assets/)) {
              const strippedHref = href.slice(3);
              if (assetMap[strippedHref]) {
                return (
                  <Link
                    component={"button"}
                    type={"button"}
                    sx={[
                      {
                        cursor: "pointer",
                        verticalAlign: "baseline",
                      },
                      ...(Array.isArray(sx) ? sx : [sx]),
                    ]}
                    color={
                      theme.palette.mode === "light"
                        ? "info.dark"
                        : "info.light"
                    }
                    onClick={() => openDialog(strippedHref)}
                  >
                    {linkProps.children}
                  </Link>
                );
              }
            }

            console.debug("Link", href, "was not found");

            // TODO - add handlers for this situation;
            return <span>{linkProps.children}</span>;
          }
          return <a {...linkProps} />;
        },
      }}
      urlTransform={(url) => url}
    >
      {markdown}
    </ReactMarkdown>
  );
}
