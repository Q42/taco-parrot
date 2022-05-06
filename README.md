# Taco parrot

The repository contains the functions to run the firebase side of Taco parrot and the parrot emulator.

## Running the emulator

### Prerequisites

Make sure you have node version 16 installed, the easiest way to do this is by using [nvm](https://github.com/nvm-sh/nvm).
If you have nvm installed you can install the required node version by running `nvm install` in the root of this repository.

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
