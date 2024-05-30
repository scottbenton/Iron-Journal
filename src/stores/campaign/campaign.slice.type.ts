import { Unsubscribe } from "firebase/firestore";
import {
  CampaignDocument,
  CampaignType,
} from "api-calls/campaign/_campaign.type";
import { CurrentCampaignSlice } from "./currentCampaign/currentCampaign.slice.type";

export interface CampaignSliceData {
  campaignMap: { [campaignId: string]: CampaignDocument };
  error?: string;
  loading: boolean;
}

export interface CampaignSliceActions {
  subscribe: (uid?: string) => Unsubscribe | undefined;

  createCampaign: (
    campaignName: string,
    campaignType: CampaignType
  ) => Promise<string>;
  getCampaign: (campaignId: string) => Promise<CampaignDocument>;
  addUserToCampaign: (uid: string, campaignId: string) => Promise<void>;
}

export type CampaignSlice = CampaignSliceData &
  CampaignSliceActions & {
    currentCampaign: CurrentCampaignSlice;
  };
