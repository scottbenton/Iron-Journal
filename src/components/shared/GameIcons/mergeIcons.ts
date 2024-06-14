import { IconDefinition, RequiredIconDefinition } from "types/Icon.type";

export function mergeIcons(
  defaultIcon: RequiredIconDefinition,
  configIcon?: RequiredIconDefinition,
  itemIcon?: IconDefinition
): RequiredIconDefinition {
  const icon = configIcon
    ? { ...configIcon }
    : {
        ...defaultIcon,
      };

  if (itemIcon) {
    if (itemIcon.color) {
      icon.color = itemIcon.color;
    }
    if (itemIcon.key) {
      icon.key = itemIcon.key;
    }
  }

  return icon;
}
