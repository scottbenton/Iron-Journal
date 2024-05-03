# Database Structure

```
// Note meaning
H - Hardcoded document name (not auto-id'd)
D - Deprecated or soon to be deprecated

├── characters <characterId, CharacterDocument>
    ├── assets <assetId, AssetDocument>
    ├── game-log <logId, GameLogDocument> // Gets converted to Roll
    ├── notes <noteId, NoteDocument>
        ├── content (H) <"content", NoteContentDocument>
    ├── settings (HD) <"settings", SettingsDocument>
    ├── tracks <trackId, TrackDocument> // Gets converted to Track
├── campaigns <campaignId, CampaignDocument>
    ├── assets <assetId, AssetDocument>
    ├── game-log <logId, GameLogDocument> // Gets converted to Roll
    ├── notes <noteId, NoteDocument>
        ├── content (H) <"content", NoteContentDocument>
    ├── settings (HD) <"settings", SettingsDocument>
    ├── tracks <trackId, TrackDocument> // Gets converted to Track
├── worlds <worldId, WorldDocument> // Gets converted to World
    ├── locations <locationId, LocationDocument> // Ironsworn only, gets converted to Location
        ├── public (H) <"notes", LocationNotesDocument>
        ├── private (H) <"details", GMLocationDocument>
    ├── lore <loreId, LoreDocument> // Gets converted to Lore
        ├── public (H) <"notes", LoreNotesDocument>
        ├── private (H) <"details", GMLoreDocument>
    ├── npcs <npcId, NPCDocument> // Gets converted to NPC
        ├── public (H) <"notes", NPCNotesDocument>
        ├── private (H) <"details", GMNPCDocument> // Gets converted to GMNPC
    ├── sectors <sectorId, SectorDocument> // Gets converted to Sector
        ├── public (H) <"notes", NoteContentDocument>
        ├── private (H) <"notes", NoteContentDocument>
        ├── locations <sectorLocationId, SectorLocationDocument>
├── homebrew
    ├── collections (H) <"collections", HomebrewCollectionDocument> // High level - container for everything else
    ├── asset_collections (H) <"asset_collections", HomebrewAssetCollectionDocument>
    ├── assets (H) <"assets", HomebrewAssetDocument>
    ├── condition_meters
    ├── editorInviteKeys
    ├── impacts
    ├── legacy_tracks
    ├── move_categories
    ├── moves
    ├── non_linear_meters
    ├── oracle_collections
    ├── oracle_tables
    ├── stats
├── users
    ├── custom-moves
    ├── custom-oracles
    ├── settings
```

## Type Links

| Type                            | File                                                                                                     |
| ------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Characters and Campaigns**    |                                                                                                          |
| CharacterDocument               | [\_character.type](./character/_character.type.ts)                                                       |
| CampaignDocument                | [\_campaign.type](./campaign/_campaign.type.ts)                                                          |
| TrackDocument                   | [\_track.type](./tracks/_track.type.ts)                                                                  |
| AssetDocument                   | [\_asset.type](./assets/_asset.type.ts)                                                                  |
| GameLogDocument                 | [\_game-log.type](./game-log/_game-log.type.ts)                                                          |
| NoteDocument                    | [\_notes.type](./notes/_notes.type.ts)                                                                   |
| NoteContentDocument             | [\_notes.type](./notes/_notes.type.ts)                                                                   |
| SettingsDocument                | [\_character-campaign-settings.type](./character-campaign-settings/_character-campaign-settings.type.ts) |
| **Worlds**                      |                                                                                                          |
| WorldDocument                   | [\_world.type](./world/_world.type.ts)                                                                   |
| LocationDocument (and related)  | [\_location.type](./world/locations/_locations.type.ts)                                                  |
| LoreDocument (and related)      | [\_lore.type](./world/lore/_lore.type.ts)                                                                |
| NPCDocument (and related)       | [\_npcs.type](./world/npcs/_npcs.type.ts)                                                                |
| SectorDocument (and related)    | [\_sectors.type](./world/sectors/_sectors.type.ts)                                                       |
| SectorLocationDocument          | [\_sectorLocations.type](./world/sectors/sectorLocations/_sectorLocations.type.ts)                       |
| **Homebrew Beta**               |                                                                                                          |
| HomebrewCollectionDocument      | [\_homebrewCollection.type](./homebrew/_homebrewCollection.type.ts)                                      |
| HomebrewAssetCollectionDocument | [\_homebrewAssetCollection.type](./homebrew/assets/collections/_homebrewAssetCollection.type)            |

---

# Related Notes

## Converting Bytes to another format

Rich text across the app (not including homebrew) is stored as `Bytes` in the database, and then converted to uint8Arrays.
The reason for doing this instead of using a more common form (like markdown), is so that I can take advantage of the realtime collaboration features from [YDocs](https://yjs.dev/) and [TipTap](https://tiptap.dev/docs/editor/guide/output#introduction).
If you are looking to export one of these fields (Hi Kat!), you can convert this either to JSON (in a structure very specific to Prosemirror Rich Text) or to HTML.

In order to do this, you will need to read it into a TipTap editor (using the same extensions as the original), and then call the [export function](https://tiptap.dev/docs/editor/guide/output#introduction) of your choice.
I've done this once before, so feel free to reach out if you need a hand!
