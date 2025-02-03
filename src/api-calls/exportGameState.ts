import { getAssets } from "./assets/getAssets";
import { getProgressTracks } from "./tracks/getProgressTracks";

export async function exportGameState(exportData: {
  campaigns: any[];
  characters: any[];
}): Promise<string> {
  try {
    // Process assets and tracks for all characters
    const assetsByCharacter = await Promise.all(
      exportData.characters.map(async (character) => {
        try {
          return await getAssets({ characterId: character.id });
        } catch (e) {
          console.error("Failed to load assets for character", character.id, e);
          return [];
        }
      })
    );

    const tracksByCharacter = await Promise.all(
      exportData.characters.map(async (character) => {
        try {
          return await getProgressTracks({
            characterId: character.id,
            status: "active",
          });
        } catch (e) {
          console.error("Failed to load tracks for character", character.id, e);
          return [];
        }
      })
    );

    const gameState = {
      // Include raw campaign data
      campaigns: exportData.campaigns,
      // Enrich characters with their associated data
      characters: exportData.characters.map((character, index) => ({
        ...character,
        assets: assetsByCharacter[index],
        tracks: tracksByCharacter[index],
      })),
      // Add timestamps for export metadata
      exportedAt: new Date().toISOString(),
      version: "1.0", // Consider using your app version here
    };

    return JSON.stringify(gameState, null, 2);
  } catch (error) {
    throw new Error(
      "Failed to export game state: " +
        (error instanceof Error ? error.message : "Unknown error")
    );
  }
}
