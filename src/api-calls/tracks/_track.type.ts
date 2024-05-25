import { Timestamp } from "firebase/firestore";
import { Clock, ProgressTrack, SceneChallenge } from "types/Track.type";

export interface ProgressTrackDocument
  extends Omit<ProgressTrack, "createdDate"> {
  createdTimestamp: Timestamp;
}
export interface ClockDocument extends Omit<Clock, "createdDate"> {
  createdTimestamp: Timestamp;
}

export interface SceneChallengeDocument
  extends Omit<SceneChallenge, "createdDate"> {
  createdTimestamp: Timestamp;
}

export type TrackDocument = ProgressTrackDocument | ClockDocument;
