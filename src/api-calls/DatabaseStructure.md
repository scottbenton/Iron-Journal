# Database Structure

```
├── characters <characterId, CharacterDocument>
    ├── assets <assetId, AssetDocument>
    ├── game-log <logId, GameLogDocument (gets converted to Roll)>
    ├── notes <noteId, NoteDocument>
        ├── content <"content", NoteContentDocument> // <-- Hardcoded subcollection name
    ├── settings
    ├── tracks <trackId, TrackDocument (gets converted to Track)>
├── campaigns <campaignId, Campaign>
    ├── assets <assetId, AssetDocument>
    ├── game-log <logId, GameLogDocument (gets converted to Roll)>
    ├── notes <noteId, NoteDocument>
        ├── content <"content", NoteContentDocument> // <-- Hardcoded subcollection name
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

## Type Links

| Type                | File                                               |
| ------------------- | -------------------------------------------------- |
| CharacterDocument   | [\_character.type](./character/_character.type.ts) |
| TrackDocument       | [\_track.type](./tracks/_track.type.ts)            |
| AssetDocument       | [\_asset.type](./assets/_asset.type.ts)            |
| GameLogDocument     | [\_game-log.type](./game-log/_game-log.type.ts)    |
| NoteDocument        | [\_notes.type](./notes/_notes.type.ts)             |
| NoteContentDocument | [\_notes.type](./notes/_notes.type.ts)             |

---

# Related Notes

## Converting Bytes to another format

Rich text across the app (not including homebrew) is stored as `Bytes` in the database, and then converted to uint8Arrays.
The reason for doing this instead of using a more common form (like markdown), is so that I can take advantage of the realtime collaboration features from [YDocs](https://yjs.dev/) and [TipTap](https://tiptap.dev/docs/editor/guide/output#introduction).
If you are looking to export one of these fields (Hi Kat!), you can convert this either to JSON (in a structure very specific to Prosemirror Rich Text) or to HTML.

In order to do this, you will need to read it into a TipTap editor (using the same extensions as the original), and then call the [export function](https://tiptap.dev/docs/editor/guide/output#introduction) of your choice.
I've done this once before, so feel free to reach out if you need a hand!
