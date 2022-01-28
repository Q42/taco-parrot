import { ParrotAction } from './parrotTypes';
import { begrijpHetNietActions } from './parrotSequences';

export function GetActionByKeywords(actions: ParrotAction[], keywords: string[]): ParrotAction {
  const keywordActions = actions.filter(
    (a) => keywords.filter((k) => a.keywords.includes(k)).length > 0
  );
  if (keywordActions.length > 0) {
    return keywordActions[0];
  }
  return GetRandomActionFromArray(begrijpHetNietActions);
}

export function GetRandomActionFromArray(actionsArray: ParrotAction[]): ParrotAction {
  return actionsArray[Math.floor(Math.random() * actionsArray.length)];
}
