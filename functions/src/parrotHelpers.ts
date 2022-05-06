import { ParrotAction } from './parrotTypes';
import { begrijpHetNietActions, overheardCommandActions } from './parrotSequences';

export function GetActionByKeywords(actions: ParrotAction[], keywords: string[]): ParrotAction {
  // Overheard action
  if (keywords.includes('overheard') || keywords.includes('gehoord')) {
    return GetRandomActionFromArray(overheardCommandActions);
  }

  // Search for actions that have one of the keywords
  const keywordActions = actions.filter(
    (a) => keywords.filter((k) => a.keywords.includes(k)).length > 0
  );
  if (keywordActions.length > 0) {
    return keywordActions[0];
  }

  // If no actions are found, return a random 'i dont understand' action.
  return GetRandomActionFromArray(begrijpHetNietActions);
}

export function GetRandomActionFromArray(actionsArray: ParrotAction[]): ParrotAction {
  return actionsArray[Math.floor(Math.random() * actionsArray.length)];
}
