import { getCampaign } from "./campaign/getCampaign";
import { getCharacter } from "./character/getCharacter";
import { getAssets } from "./assets/getAssets";
import { getProgressTracks } from "./tracks/getProgressTracks";

export async function exportGameState(campaignId: string, characterId: string): Promise<string> {
  try {
    const campaign = campaignId ? await getCampaign(campaignId).catch(() => null) : null;
    const character = characterId ? await getCharacter(characterId).catch(() => null) : null;

    const assets = character ? await getAssets({ characterId }).catch(() => []) : [];
    const tracks = character ? await getProgressTracks({ characterId, status: "active" }).catch(() => []) : [];

    const gameState = {
      campaign,
      character,
      assets,
      tracks,
    };

    return gameState;
  } catch (error) {
    throw new Error("Failed to export game state: " + error.message);
  }
}
