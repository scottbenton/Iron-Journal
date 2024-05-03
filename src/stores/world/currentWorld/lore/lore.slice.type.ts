import { Unsubscribe } from "firebase/firestore";
import { GMLore, Lore } from "types/Lore.type";

export type LoreDocumentWithGMProperties = Lore & {
  gmProperties?: GMLore | null;
  notes?: Uint8Array | null;
  imageUrl?: string;
};

export interface LoreSliceData {
  loreMap: { [key: string]: LoreDocumentWithGMProperties };
  loading: boolean;
  error?: string;
  openLoreId?: string;
  loreSearch: string;
}

export interface LoreSliceActions {
  subscribe: (worldId: string, worldOwnerIds: string[]) => Unsubscribe;
  setOpenLoreId: (loreId?: string) => void;
  setLoreSearch: (search: string) => void;

  createLore: () => Promise<string>;
  deleteLore: (loreId: string) => Promise<void>;
  updateLore: (loreId: string, lore: Partial<Lore>) => Promise<void>;
  updateLoreGMNotes: (
    loreId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateLoreGMProperties: (
    loreId: string,
    gmProperties: Partial<GMLore>
  ) => Promise<void>;
  updateLoreNotes: (
    loreId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  uploadLoreImage: (loreId: string, image: File) => Promise<void>;
  removeLoreImage: (loreId: string) => Promise<void>;
  subscribeToOpenLore: (loreId: string) => Unsubscribe;

  resetStore: () => void;
}

export type LoreSlice = LoreSliceData & LoreSliceActions;
