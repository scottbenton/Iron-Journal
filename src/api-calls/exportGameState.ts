import { getCampaign } from "./campaign/getCampaign";
import { getCharacter } from "./character/getCharacter";
import { listenToAssets } from "./assets/listenToAssets";
import { listenToProgressTracks } from "./tracks/listenToProgressTracks";

export async function exportGameState(campaignId: string, characterId: string): Promise<string> {
  try {
    const campaign = await getCampaign(campaignId);
    const character = await getCharacter(characterId);

    const assets = await new Promise((resolve, reject) => {
      listenToAssets(characterId, campaignId, resolve, reject);
    });

    const tracks = await new Promise((resolve, reject) => {
      listenToProgressTracks(campaignId, characterId, "active", resolve, reject);
    });

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
