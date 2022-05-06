// eslint-disable-next-line @typescript-eslint/no-var-requires
const keyword_extractor = require('keyword-extractor');
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
import { lunchIsKlaar, watSchaftDePot } from './parrotActionJson';

admin.initializeApp();

/**
 * Process request function, this processes any incoming text and returns a response sequence based on the text.
 */
exports.processRequest = functions.https.onRequest(async (req, res) => {
  const request = req.query.text as string;
  console.debug(`Received request ${request}`);

  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  let result: string[] = [];
  try {
    result = keyword_extractor.extract(request, {
      language: 'dutch',
      remove_digits: true,
      return_changed_case: true,
    });
  } catch (err) {
    console.error(`There was an error extracting keywords: ${err}`);
    console.error(err);
  }

  console.debug(result);
  const action = GetActionByKeywords(textRequestActions, result);
  console.info(`Found action with url ${action.audioUrl}`);

  const sequence: ParrotSequence = { actions: [action] };
  res.json(sequence);
});

/**
 * Get an action based on a specific command.
 */
exports.getActionForCommand = functions.https.onRequest(async (req, res) => {
  const command = req.query.command;

  // CORS
  res.set('Access-Control-Allow-Origin', '*');
  if (req.method === 'OPTIONS') {
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    res.status(204).send('');
    return;
  }

  let action = GetRandomActionFromArray(begrijpHetNietActions);

  switch (command) {
    case ParrotCommands.RANDOM_ACTION:
      action = GetRandomActionFromArray(randomIdleActions);
      break;
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
