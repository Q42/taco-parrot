import {
  aahAahAction,
  alohagoritmeOverheard,
  alsHetGoedIsOverheard,
  begrijpJeNiet,
  blijBlij,
  bonjoOverheard,
  duurtLangAction,
  frankOverheard,
  gebruikersOverheard,
  gewonnenAction,
  guusOverheard,
  halloHalloAction,
  jaaAction,
  jQueryOverhead,
  laatMeNouAction,
  nietGetestOverheard,
  olaAmigoAction,
  olaCHicaAction,
  roddelsAction,
  tandenborstelsOverheard,
  thijsOverheard,
  watMoetJeAction,
  watSchaftDePot,
  papegaaittjeLeefJeNog,
  antwoord42,
  trudyTrudy,
  lunchIsKlaar,
  watBedoelJe,
} from './parrotActionJson';
import { ParrotAction } from './parrotTypes';

export const textRequestActions: ParrotAction[] = [
  halloHalloAction,
  roddelsAction,
  gewonnenAction,
  watSchaftDePot,
  blijBlij,
  papegaaittjeLeefJeNog,
  antwoord42,
  trudyTrudy,
  laatMeNouAction,
];

export const welcomeCommandActions: ParrotAction[] = [
  halloHalloAction,
  jaaAction,
  olaAmigoAction,
  olaCHicaAction,
  watMoetJeAction,
];

export const randomIdleActions: ParrotAction[] = [
  laatMeNouAction,
  duurtLangAction,
  aahAahAction,
  gewonnenAction,
  olaAmigoAction,
  olaCHicaAction,
  watMoetJeAction,
  trudyTrudy,
  lunchIsKlaar,
];

export const begrijpHetNietActions: ParrotAction[] = [
  begrijpJeNiet,
  watBedoelJe,
  watMoetJeAction,
  laatMeNouAction,
  aahAahAction,
];

export const overheardCommandActions: ParrotAction[] = [
  guusOverheard,
  jQueryOverhead,
  nietGetestOverheard,
  alohagoritmeOverheard,
  gebruikersOverheard,
  tandenborstelsOverheard,
  thijsOverheard,
  alsHetGoedIsOverheard,
  bonjoOverheard,
  frankOverheard,
];
