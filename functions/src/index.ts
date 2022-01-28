import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { ParrotSequence, ParrotCommands } from './parrotTypes';
import {
  welcomeCommandActions,
  overheardCommandActions,
  textRequestActions,
  randomIdleActions,
  begrijpHetNietActions,
} from './parrotSequences';
import { GetActionByKeywords, GetRandomActionFromArray } from './parrotHelpers';
import * as keyword_extractor from 'keyword-extractor';
import { lunchIsKlaar, watSchaftDePot } from './parrotActionJson';

admin.initializeApp();

exports.processRequest = functions.https.onRequest(async (req, res) => {
  const request = req.query.text;

  /* @ts-ignore */
  const result: string[] = keyword_extractor.extract(request, {
    language: 'dutch',
    remove_digits: true,
    return_changed_case: true,
    remove_duplicates: true,
  });

  console.log(result);
  const action = GetActionByKeywords(textRequestActions, result);
  console.log(`Found action with url ${action.audioUrl}`);

  const sequence: ParrotSequence = { actions: [action] };
  res.json(sequence);
});

exports.randomIdleSequence = functions.https.onRequest(async (req, res) => {
  const action = GetRandomActionFromArray(randomIdleActions);
  const sequence: ParrotSequence = { actions: [action] };
  res.json(sequence);
});

exports.getActionForCommand = functions.https.onRequest(async (req, res) => {
  const command = req.query.command;

  let action = GetRandomActionFromArray(begrijpHetNietActions);

  switch (command) {
    case ParrotCommands.WELCOME:
      action = GetRandomActionFromArray(welcomeCommandActions);
      break;
    case ParrotCommands.OVERHEARD:
      action = GetRandomActionFromArray(overheardCommandActions);
      break;
    case ParrotCommands.LUNCH:
      action = watSchaftDePot;
      break;
    case ParrotCommands.LUNCH_READY:
      action = lunchIsKlaar;
      break;
    default:
      break;
  }

  const sequence: ParrotSequence = { actions: [action] };
  res.json(sequence);
});
