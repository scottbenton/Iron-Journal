import { useEffect } from "react";
import { useStore } from "stores/store";
import { Avatar, Skeleton } from "@mui/material";

export interface UserAvatarProps {
  uid: string;
  forceName?: string;
  forceShowPhoto?: boolean;
}

export function UserAvatar(props: UserAvatarProps) {
  const { uid, forceShowPhoto, forceName } = props;
  const user = useStore((store) => store.users.userMap[uid]?.doc);
  const loadUser = useStore((store) => store.users.loadUserDocument);
  useEffect(() => {
    loadUser(uid);
  }, [loadUser, uid]);

  const initials = getInitials(forceName ?? user?.displayName ?? "User");
  if (!user) {
    return (
      <Skeleton variant={"circular"}>
        <Avatar />
      </Skeleton>
    );
  }

  let shouldShowPhoto = false;
  if (forceShowPhoto !== undefined) {
    shouldShowPhoto = forceShowPhoto;
  } else {
    shouldShowPhoto = !user.hidePhoto;
  }

  return (
    <Avatar
      src={shouldShowPhoto && user.photoURL ? user.photoURL : undefined}
      sx={(theme) => ({
        bgcolor: theme.palette.darkGrey.dark,
        color: theme.palette.darkGrey.contrastText,
      })}
    >
      {initials}
    </Avatar>
  );
}

const getInitials = (name: string) => {
  const names = name.split(" ");
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
};
