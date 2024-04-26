import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { LinkComponent } from "components/shared/LinkComponent";
import { constructHomebrewEditorPath } from "pages/Homebrew/routes";
import { useStore } from "stores/store";
import { FlyoutMenuList } from "./FlyoutMenuList";

export function HomebrewMenu() {
  const homebrewCollections = useStore((store) => store.homebrew.collections);
  const sortedHomebrewCollections = useStore(
    (store) => store.homebrew.sortedHomebrewCollectionIds
  );
  return (
    <FlyoutMenuList
      label={"Homebrew"}
      itemIds={sortedHomebrewCollections}
      renderListItem={(collectionId) => (
        <ListItem key={collectionId} disablePadding>
          <ListItemButton
            LinkComponent={LinkComponent}
            href={constructHomebrewEditorPath(collectionId)}
          >
            <ListItemText
              primary={
                homebrewCollections[collectionId].base?.title ||
                "Unnamed Collection"
              }
            />
          </ListItemButton>
        </ListItem>
      )}
    />
  );
}
