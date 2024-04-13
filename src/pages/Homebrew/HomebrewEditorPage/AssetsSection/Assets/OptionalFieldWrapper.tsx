import { PropsWithChildren } from "react";
import {
  Control,
  FieldPath,
  FieldPathValue,
  FieldValues,
  useWatch,
} from "react-hook-form";

export interface OptionalFieldWrapperProps<
  Form extends FieldValues,
  TName extends FieldPath<Form>
> {
  when: {
    field: TName;
    is: FieldPathValue<Form, TName>;
  };
  control: Control<Form>;
}

export function OptionalFieldWrapper<
  Form extends FieldValues,
  TName extends FieldPath<Form>
>(props: PropsWithChildren<OptionalFieldWrapperProps<Form, TName>>) {
  const { when, control, children } = props;

  const value = useWatch({
    control,
    name: when.field,
  });

  if (value === when.is) {
    return children;
  }
  return null;
}
