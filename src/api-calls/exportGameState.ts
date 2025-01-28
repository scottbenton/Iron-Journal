import { getCampaign } from "./campaign/getCampaign";
import { getCharacter } from "./character/getCharacter";
import { getAssets } from "./assets/getAssets";
import { getProgressTracks } from "./tracks/getProgressTracks";

export async function exportGameState(campaignId: string, characterId: string): Promise<string> {
  try {
    const campaign = await getCampaign(campaignId);
    const character = await getCharacter(characterId);

    const assets = await getAssets(characterId, campaignId);

    const tracks = await getProgressTracks(campaignId, characterId, "active");

    const gameState = {
      campaign,
      character,
      assets,
      tracks,
    };

    return JSON.stringify(gameState);
  } catch (error) {
    throw new Error("Failed to export game state: " + error.message);
  }
}
