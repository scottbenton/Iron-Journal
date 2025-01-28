import { getCampaign } from "./campaign/getCampaign";
import { getCharacter } from "./character/getCharacter";
import { getAssets } from "./assets/getAssets";
import { getProgressTracks } from "./tracks/getProgressTracks";

export async function exportGameState(campaignId: string, characterId: string): Promise<string> {
  try {
    let campaign = null;
    if (campaignId) {
      try {
        campaign = await getCampaign(campaignId);
      } catch (error) {
        console.warn("Could not find campaign:", error.message);
      }
    }
    let character = null;
    try {
      character = await getCharacter(characterId);
    } catch (error) {
      console.warn("Could not find character:", error.message);
    }

    const assets = await getAssets(characterId, campaignId || undefined);

    const tracks = await getProgressTracks(campaignId || undefined, characterId, "active");

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
