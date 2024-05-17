import { Control, useWatch } from "react-hook-form";
import { Form } from "./MoveDialogForm";
import { MoveType } from "api-calls/homebrew/moves/moves/_homebrewMove.type";
import { PropsWithChildren } from "react";

export interface MoveTypeFieldWrapperProps {
  control: Control<Form>;
  moveType: MoveType;
}

export function MoveTypeFieldWrapper(
  props: PropsWithChildren<MoveTypeFieldWrapperProps>
) {
  const { control, moveType, children } = props;

  const type = useWatch<Form>({
    name: "type",
    control,
  });

  if (type === moveType) {
    return <>{children}</>;
  }
  return <></>;
}
