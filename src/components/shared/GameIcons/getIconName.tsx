export function getIconName(iconKey: string): string {
  let result = iconKey
    .replace(/Gi([A-Z0-9])/g, " $1")
    .replace(/([a-z])([A-Z0-9])/g, "$1 $2")
    .trim();

  const lastSpaceIndex = result.lastIndexOf(" ");
  if (lastSpaceIndex !== -1) {
    const numberPart = result.substring(lastSpaceIndex + 1);
    if (!isNaN(Number(numberPart))) {
      const numberWithoutLeadingZeros = parseInt(numberPart, 10).toString();
      result =
        result.substring(0, lastSpaceIndex + 1) + numberWithoutLeadingZeros;
    }
  }

  return result;
}
