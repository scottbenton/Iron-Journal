import {
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { UserAvatar } from "components/shared/UserAvatar";
import { useEffect } from "react";
import { useStore } from "stores/store";

export interface UserListItemProps {
  uid: string;
}

export function UserListItem(props: UserListItemProps) {
  const { uid } = props;

  const user = useStore((store) => store.users.userMap[uid]?.doc);
  const loadPlayer = useStore((store) => store.users.loadUserDocument);

  useEffect(() => {
    loadPlayer(uid);
  }, [uid, loadPlayer]);

  return (
    <ListItem disablePadding>
      <ListItemAvatar>
        <UserAvatar uid={uid} />
      </ListItemAvatar>
      <ListItemText>{user?.displayName ?? <Skeleton />}</ListItemText>
    </ListItem>
  );
}
