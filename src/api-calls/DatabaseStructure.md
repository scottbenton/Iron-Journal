```
├── characters <characterId, CharacterDocument>
    ├── tracks <trackId, TrackDocument>
    ├── assets
    ├── notes
    ├── game-log
    ├── settings
├── campaigns <campaignId, Campaign>
    ├── tracks <trackId, Track>
    ├── assets
    ├── notes
    ├── game-log
    ├── settings
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
    ├── settings
    ├── custom-moves
    ├── custom-oracles
```

| Type              | File                                               |
| ----------------- | -------------------------------------------------- |
| CharacterDocument | [\_character.type](./character/_character.type.ts) |
