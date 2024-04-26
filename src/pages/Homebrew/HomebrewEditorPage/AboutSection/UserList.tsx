import { List } from "@mui/material";
import { UserListItem } from "./UserListItem";

export interface UserListProps {
  userIds: string[];
}

export function UserList(props: UserListProps) {
  const { userIds } = props;

  return (
    <List>
      {userIds.map((uid) => (
        <UserListItem key={uid} uid={uid} />
      ))}
    </List>
  );
}
