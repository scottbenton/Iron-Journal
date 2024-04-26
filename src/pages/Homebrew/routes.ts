import { BASE_ROUTES, basePaths } from "routes";

export enum HOMEBREW_ROUTES {
  SELECT,
  EDITOR,
  EDITOR_JOIN,
}

export const homebrewPaths: { [key in HOMEBREW_ROUTES]: string } = {
  [HOMEBREW_ROUTES.SELECT]: "",
  [HOMEBREW_ROUTES.EDITOR]: ":homebrewId",
  [HOMEBREW_ROUTES.EDITOR_JOIN]: "invite/:editorInviteKey",
};

export function constructHomebrewEditorPath(homebrewId: string) {
  return `${basePaths[BASE_ROUTES.HOMEBREW]}/${homebrewId}`;
}

export function constructHomebrewEditorInvitePath(inviteKey: string) {
  return `${basePaths[BASE_ROUTES.HOMEBREW]}/invite/${inviteKey}`;
}
