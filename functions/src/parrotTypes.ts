export enum ParrotCommands {
  WELCOME = 'WELCOME',
  OVERHEARD = 'OVERHEARD',
  LUNCH = 'LUNCH',
  LUNCH_READY = 'LUNCH_READY',
}

export type ParrotMovement = {
  type:
    | 'MOVE_FORWARD'
    | 'MOVE_BACKWARD'
    | 'BLINK'
    | 'SQUEAK'
    | 'MOUTH_OPEN'
    | 'DANCE'
    | 'FLAP'
    | 'NOD'
    | 'SHAKE'
    | 'WIGGLE'
    | 'IDLE'
    | 'STOP';
  offset: number;
};

export type ParrotAction = {
  keywords: string[];
  audioUrl?: string;
  textToSpeech?: string;
  movements: ParrotMovement[];
};

export type ParrotSequence = {
  actions: ParrotAction[];
};
