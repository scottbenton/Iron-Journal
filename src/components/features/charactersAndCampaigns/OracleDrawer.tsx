import { SwipeableDrawer } from "@mui/material";
import { OracleSection as OracleSectionOld } from "./OracleSection";
import { OracleSection } from "./NewOracleSection";
import React, { useCallback } from "react";
import { useNewCustomContentPage } from "hooks/featureFlags/useNewCustomContentPage";

export interface OracleDrawerProps {
  open?: boolean;
  onClose: () => void;
}

function OracleDrawerUnMemoized(props: OracleDrawerProps) {
  const { open, onClose } = props;

  const showNewOracles = useNewCustomContentPage();
  const openCallback = useCallback(() => {}, []);
  return (
    <SwipeableDrawer
      open={open}
      onOpen={openCallback}
      keepMounted
      disableSwipeToOpen
      disableDiscovery
      onClose={onClose}
    >
      {showNewOracles ? <OracleSection /> : <OracleSectionOld />}
    </SwipeableDrawer>
  );
}

export const OracleDrawer = React.memo(
  OracleDrawerUnMemoized,
  (prevProps, nextProps) => prevProps.open === nextProps.open
);
