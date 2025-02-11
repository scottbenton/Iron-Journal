import { Unsubscribe } from "firebase/firestore";
import { GMNPC, NPC } from "types/NPCs.type";

export type NPCDocumentWithGMProperties = NPC & {
  gmProperties?: GMNPC | null;
  notes?: Uint8Array | null;
  imageUrl?: string;
};

export interface NPCsSliceData {
  npcMap: { [key: string]: NPCDocumentWithGMProperties };
  loading: boolean;
  error?: string;
  openNPCId?: string;
  npcSearch: string;
}

export interface NPCsSliceActions {
  subscribe: (worldId: string, worldOwnerIds: string[]) => Unsubscribe;
  setOpenNPCId: (npcId?: string) => void;
  setNPCSearch: (search: string) => void;

  createNPC: (npc?: Partial<NPC>) => Promise<string>;
  deleteNPC: (npcId: string) => Promise<void>;
  updateNPC: (npcId: string, npc: Partial<NPC>) => Promise<void>;
  updateNPCGMNotes: (
    npcId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateNPCGMProperties: (
    npcId: string,
    gmProperties: Partial<GMNPC>
  ) => Promise<void>;
  updateNPCNotes: (
    npcId: string,
    notes: Uint8Array,
    isBeaconRequest?: boolean
  ) => Promise<void>;
  updateNPCCharacterBond: (
    npcId: string,
    characterId: string,
    bonded: boolean
  ) => Promise<void>;
  updateNPCCharacterConnection: (
    npcId: string,
    characterId: string,
    connected: boolean
  ) => Promise<void>;
  updateNPCCharacterBondValue: (
    npcId: string,
    characterId: string,
    value: number
  ) => Promise<void>;
  uploadNPCImage: (npcId: string, image: File) => Promise<void>;
  removeNPCImage: (npcId: string) => Promise<void>;
  subscribeToOpenNPC: (npcId: string) => Unsubscribe;

  resetStore: () => void;
}

export type NPCsSlice = NPCsSliceData & NPCsSliceActions;
