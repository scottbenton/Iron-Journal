import sunderedIsles from "@datasworn/sundered-isles/json/sundered_isles.json";

const incompatibleTextReplacementMap: Record<string, Record<string, string>> = {
  [sunderedIsles._id]: {
    "STARSHIP": "FLAGSHIP",
    "interstellar": "seafaring",
    "planetside": "overland",
    "planet": "island",
    "stellar": "mystical",
    "power bow": "longbow or crossbow",
    "electromagnetic disrupter": "flaming arrow",
    "hack or manipulate a secure system": "open a locked door or container"
  },
}

export const getCompatibleText = (compatibilityExpansionIds: string[], text?: string): string => {
  if (!text) {
    return "";
  }

  compatibilityExpansionIds.forEach((expansionId) => {
    if (Object.keys(incompatibleTextReplacementMap).includes(expansionId)) {
      Object.entries(incompatibleTextReplacementMap[expansionId]).forEach(([incompatible, replacement]) => {
        text = text!.replaceAll(incompatible, replacement);
      });
    }
  });

  return text;
}