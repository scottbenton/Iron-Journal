import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useStore } from "stores/store";
import { DialogTitleWithCloseButton } from "../DialogTitleWithCloseButton";
import { UserDocument } from "api-calls/user/_user.type";
import { HomebrewUpdate } from "./UpdateComponents/HomebrewUpdate";

const updateComponents: {
  key: keyof Required<UserDocument>["updateAlerts"];
  title: string;
  component: React.ReactNode;
}[] = [
  {
    key: "homebrewMigration",
    title: "Homebrew Updates",
    component: <HomebrewUpdate />,
  },
];

export function UpdateDialog() {
  const getUser = useStore((store) => store.users.loadUserDocument);
  const uid = useStore((store) => store.auth.uid);
  const updateAlerts = useStore(
    (store) => store.users.userMap[store.auth.uid]?.doc?.updateAlerts
  );

  const [isOpen, setIsOpen] = useState(false);
  const markUpdatesAsRead = useStore((store) => store.auth.markUpdatesAsRead);
  const [currentUpdateIndex, setCurrentUpdateIndex] = useState(0);

  useEffect(() => {
    if (uid) {
      getUser(uid);
    }
  }, [getUser, uid]);

  useEffect(() => {
    if (updateAlerts && Object.keys(updateAlerts).length > 0) {
      setIsOpen(true);
    }
  }, [updateAlerts]);

  const activeAlerts = updateAlerts
    ? Object.keys(updateAlerts).filter(
        (alertKey) => updateAlerts[alertKey as keyof typeof updateAlerts]
      )
    : [];

  if (!updateAlerts || activeAlerts.length === 0) {
    return null;
  }

  const filteredAlertComponents = updateComponents.filter((component) =>
    activeAlerts.includes(component.key)
  );

  const handleClose = () => {
    setIsOpen(false);
    markUpdatesAsRead(Object.keys(updateAlerts));
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitleWithCloseButton onClose={handleClose}>
        {filteredAlertComponents[currentUpdateIndex]?.title ??
          "Update not found"}
      </DialogTitleWithCloseButton>
      <DialogContent>
        {filteredAlertComponents[currentUpdateIndex]?.component}
      </DialogContent>
      <DialogActions>
        {currentUpdateIndex > 0 && (
          <Box flexGrow={1}>
            <Button
              color={"inherit"}
              onClick={() => setCurrentUpdateIndex((prev) => prev - 1)}
            >
              Prev
            </Button>
          </Box>
        )}
        {currentUpdateIndex < filteredAlertComponents.length - 1 &&
          filteredAlertComponents.length > 1 && (
            <Button
              color={"inherit"}
              onClick={() => setCurrentUpdateIndex((prev) => prev + 1)}
            >
              Next
            </Button>
          )}
        {currentUpdateIndex === filteredAlertComponents.length - 1 && (
          <Button variant="contained" onClick={handleClose}>
            Close
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
