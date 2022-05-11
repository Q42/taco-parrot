# Taco parrot

The repository contains the functions to run the firebase side of Taco parrot and the parrot emulator.

## Running the emulator

### Prerequisites

Make sure you have [node](https://nodejs.org/en/) version 16 installed.

- _the easiest way to do this on mac/linux is by using [nvm](https://github.com/nvm-sh/nvm).
If you have nvm installed you can install the required node version by running `nvm install` in the root of this repository._

Make sure you have [firebase-tools](https://www.npmjs.com/package/firebase-tools) installed (`npm install -g firebase-tools`)

### Starting the emulator

Open a terminal and run the following commands from the root folder to start the functions:

```bash
  cd functions
  npm install
  npm run serve
```

Open a second terminal and run the following commands from the root folder to start the emulator:

```bash
  cd hosting
  npm install
  npm run dev
```

After running both these commands you can reach the emulator on <http://localhost:3000/>

## Development

#### Frontend

The [`hosting`](./hosting/) folder contains the frontend of the emulator.
The [`TacoVoice.vue`](./hosting/src/components/TacoVoice.vue) component listens to input & calls the functions. The [`TacoParrot.vue`](./hosting/src/components/TacoParrot.vue) component executes the commands returned from the functions & makes sure the parrot moves.

The frontend is build using [vuejs](https://vuejs.org/) and automatically detects code changes & updates the emulator frontend accordingly.

#### backend

The backend consists of firebase functions found in the [`functions`](./functions/) folder. You can find the entry points for the 2 endpoints we use in [`index.ts`](./functions/src/index.ts). The actions the parrot executes can be found in [`parrotActionJson.ts`](./functions/src/parrotActionJson.ts).

The firebase emulator does __not__ automatically update on code changes. In order to see any changes you made you can restart the emulator using `npm run serve` in the functions folder (stopping the running emulator can be done with `ctrl + c`)
