import {
  Box,
  IconButton,
  LinearProgress,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import {
  FC,
  PropsWithChildren,
  forwardRef,
  CSSProperties,
  memo,
  useEffect,
  useState,
} from "react";
import { IconBaseProps } from "react-icons";
import { getIconName } from "./getIconName";
import { GridComponents, VirtuosoGrid } from "react-virtuoso";

export interface IconListProps {
  nameFilter?: string;
  onClick: (iconKey: string) => void;
}

const ListComponent = forwardRef<
  HTMLDivElement,
  PropsWithChildren<{ style?: CSSProperties }>
>((props, ref) => (
  <Box
    style={props.style}
    ref={ref} // Fix: Use 'ref' instead of 'props.ref'
    display={"flex"}
    flexDirection={"row"}
    flexWrap={"wrap"}
  >
    {props.children}
  </Box>
));

ListComponent.displayName = "ListComponent"; // Fix: Add display name

const gridComponents: GridComponents = {
  List: ListComponent,
};

function IconListNonMemoized(props: IconListProps) {
  const { nameFilter, onClick } = props;

  const [icons, setIcons] = useState<Record<string, FC<IconBaseProps>>>();

  const filteredIconKeys = Object.keys(icons ?? {}).filter((iconKey) => {
    if (!nameFilter) {
      return true;
    }

    return getIconName(iconKey)
      .toLowerCase()
      .includes(nameFilter.toLowerCase());
  });

  useEffect(() => {
    const importIcons = async () => {
      const components = await import("react-icons/gi");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { default: _, ...newIcons } = components;
      setIcons(newIcons);
    };

    importIcons();
  }, []);

  if (!icons) {
    return <LinearProgress />;
  }

  return (
    <VirtuosoGrid
      totalCount={filteredIconKeys.length}
      components={gridComponents}
      style={{ height: 300 }}
      itemContent={(index) => {
        const iconKey = filteredIconKeys[index];
        return (
          <Tooltip title={`Choose ${getIconName(iconKey)}`}>
            <IconButton sx={{ mr: 1, mb: 1 }} onClick={() => onClick(iconKey)}>
              <SvgIcon
                fontSize={"large"}
                component={icons[iconKey]}
                inheritViewBox
              />
            </IconButton>
          </Tooltip>
        );
      }}
    />
  );
}

export const IconList = memo(
  IconListNonMemoized,
  (prev, next) =>
    prev.nameFilter === next.nameFilter && prev.onClick === next.onClick
);
