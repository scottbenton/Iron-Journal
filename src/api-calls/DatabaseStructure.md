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
    ├── collections (H) <"collections", <collectionId, HomebrewCollectionDocument>> // High level - container for everything else
    ├── asset_collections (H) <"asset_collections", <assetCollectionId, HomebrewAssetCollectionDocument>>
    ├── assets (H) <"assets", <assetId, HomebrewAssetDocument>>
    ├── condition_meters (H) <"condition_meters", <conditionMeterId, HomebrewConditionMeterDocument>>
    ├── !! editorInviteKeys // Dealt with on the backend
    ├── impacts (H) <"impacts", <impactCategoryId, HomebrewImpactCategoryDocument>>
    ├── legacy_tracks <"legacy_tracks", <legacyTrackId, HomebrewLegacyTrackDocument>>
    ├── move_categories <"move_categories", <moveCategoryId, HomebrewMoveCategoryDocument>>
    ├── moves <"moves", <moveId, HomebrewMoveDocument>>
    ├── non_linear_meters <"non_linear_meters", <nonLinearMeterId, HomebrewNonLinearMeterDocument>>
    ├── oracle_collections <"oracle_collections", <oracleCollectionId, HomebrewOracleCollectionDocument>>
    ├── oracle_tables <"oracle_tables", <oracleTableId, HomebrewOracleTableDocument>>
    ├── stats <"stats", <statId, HomebrewStatDocument>>
├── users <userId, UserDocument>
    ├── custom-moves (HD) <"custom-moves", CustomMoveDocument>>
    ├── custom-oracles (HD) <"custom-oracles", CustomOracleDocument>>
    ├── settings (H) <"accessibility", AccessibilitySettingsDocument> | <"oracle" | OracleSettingsDocument>
```

## Type Links

| Type                             | File                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| **Characters and Campaigns**     |                                                                                                          |
| CharacterDocument                | [\_character.type](./character/_character.type.ts)                                                       |
| CampaignDocument                 | [\_campaign.type](./campaign/_campaign.type.ts)                                                          |
| TrackDocument                    | [\_track.type](./tracks/_track.type.ts)                                                                  |
| AssetDocument                    | [\_asset.type](./assets/_asset.type.ts)                                                                  |
| GameLogDocument                  | [\_game-log.type](./game-log/_game-log.type.ts)                                                          |
| NoteDocument                     | [\_notes.type](./notes/_notes.type.ts)                                                                   |
| NoteContentDocument              | [\_notes.type](./notes/_notes.type.ts)                                                                   |
| SettingsDocument                 | [\_character-campaign-settings.type](./character-campaign-settings/_character-campaign-settings.type.ts) |
| **Worlds**                       |                                                                                                          |
| WorldDocument                    | [\_world.type](./world/_world.type.ts)                                                                   |
| LocationDocument (and related)   | [\_location.type](./world/locations/_locations.type.ts)                                                  |
| LoreDocument (and related)       | [\_lore.type](./world/lore/_lore.type.ts)                                                                |
| NPCDocument (and related)        | [\_npcs.type](./world/npcs/_npcs.type.ts)                                                                |
| SectorDocument (and related)     | [\_sectors.type](./world/sectors/_sectors.type.ts)                                                       |
| SectorLocationDocument           | [\_sectorLocations.type](./world/sectors/sectorLocations/_sectorLocations.type.ts)                       |
| **Homebrew Beta**                |                                                                                                          |
| HomebrewCollectionDocument       | [\_homebrewCollection.type](./homebrew/_homebrewCollection.type.ts)                                      |
| HomebrewAssetCollectionDocument  | [\_homebrewAssetCollection.type](./homebrew/assets/collections/_homebrewAssetCollection.type)            |
| HomebrewAssetDocument            | [\_homebrewAssets.type](./homebrew/assets/assets/_homebrewAssets.type.ts)                                |
| HomebrewConditionMeterDocument   | [\_homebrewConditionMeters.type](./homebrew/rules/conditionMeters/_homebrewConditionMeters.type.ts)      |
| HomebrewImpactCategoryDocument   | [\_homebrewImpacts.type](./homebrew/rules/impacts/_homebrewImpacts.type.ts)                              |
| HomebrewLegacyTrackDocument      | [\_homebrewLegacyTrack.type](./homebrew/rules/legacyTracks/_homebrewLegacyTrack.type.ts)                 |
| HomebrewMoveCategoryDocument     | [\_homebrewMoveCategory.type](./homebrew/moves/categories/_homebrewMoveCategory.type.ts)                 |
| HomebrewMoveDocument             | [\_homebrewMove.type](./homebrew/moves/moves/_homebrewMove.type.ts)                                      |
| HomebrewNonLinearMeterDocument   | [\_homebrewNonLinearMeter.type](./homebrew/rules/nonLinearMeters/_homebrewNonLinearMeter.type.ts)        |
| HomebrewOracleCollectionDocument | [\_homebrewOracleCollection.type](./homebrew/oracles/collections/_homebrewOracleCollection.type.ts)      |
| HomebrewOracleTableDocument      | [\_homebrewOracleTable.type](./homebrew/oracles/tables/_homebrewOracleTable.type.ts)                     |
| HomebrewStatDocument             | [\_homebrewStat.type](./homebrew/rules/stats/_homebrewStat.type.ts)                                      |
| **Users**                        |                                                                                                          |
| UserDocument                     | [\_user.type](./user/_user.type.ts)                                                                      |
| CustomMoveDocument               | [\_custom-moves.type](./user/custom-moves/_custom-moves.type.ts)                                         |
| CustomOracleDocument             | [\_custom-oracles.type](./user/custom-oracles/_custom-oracles.type.ts)                                   |
| AccessibilitySettingsDocument    | [\_settings.type](./user/settings/_settings.type.ts)                                                     |
| OracleSettingsDocument           | [\_settings.type](./user/settings/_settings.type.ts)                                                     |

---

# Related Notes

## Converting Bytes to another format

Rich text across the app (not including homebrew) is stored as `Bytes` in the database, and then converted to uint8Arrays.
The reason for doing this instead of using a more common form (like markdown), is so that I can take advantage of the realtime collaboration features from [YDocs](https://yjs.dev/) and [TipTap](https://tiptap.dev/docs/editor/guide/output#introduction).
If you are looking to export one of these fields (Hi Kat!), you can convert this either to JSON (in a structure very specific to Prosemirror Rich Text) or to HTML.

In order to do this, you will need to read it into a TipTap editor (using the same extensions as the original), and then call the [export function](https://tiptap.dev/docs/editor/guide/output#introduction) of your choice.
I've done this once before, so feel free to reach out if you need a hand!

# Flattened Collection Structure (thought experiment - does not relate to the current implementation)

characters
assets
game-logs
notes
note-content // kept separate from notes so that public viewers don't need to load all
tracks
campaigns
worlds
locations
location-notes // separate from locations so public viewers don't need to load it
location-guide-notes // needs replicated for field-level access
lore
lore-notes // separate from lroe so public viewers don't need to load it
lore-gm-notes // needs replicated for field-level access
npcs
npc-notes // separate from npcs so public viewers don't need to load it
npc-gm-notes // needs replicated for field-level access
