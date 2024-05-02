```
├── characters <characterId, CharacterDocument>
    ├── assets <assetId, AssetDocument>
    ├── game-log
    ├── notes
    ├── settings
    ├── tracks <trackId, TrackDocument (gets converted to Track)>
├── campaigns <campaignId, Campaign>
    ├── assets <assetId, AssetDocument>
    ├── game-log
    ├── notes
    ├── settings
    ├── tracks <trackId, TrackDocument (gets converted to Track)>
├── worlds
    ├── locations
        ├── public
        ├── private
    ├── lore
        ├── public
        ├── private
    ├── npcs
        ├── public
        ├── private
    ├── sectors
        ├── public
        ├── private
├── homebrew
    ├── asset_collections
    ├── assets
    ├── collections
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

| Type              | File                                               |
| ----------------- | -------------------------------------------------- |
| CharacterDocument | [\_character.type](./character/_character.type.ts) |
| TrackDocument     | [\_track.type](./tracks/_track.type.ts)            |
| AssetDocument     | [\_asset.type](./assets//_asset.type.ts)           |
