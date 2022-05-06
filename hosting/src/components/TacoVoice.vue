<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sleep } from "@/helpers";
import { ref, onMounted } from "vue";
import {
  ParrotCommands,
  type ParrotSequence,
} from "../../../functions/src/parrotTypes";

const emit = defineEmits<{
  (e: "tacoCommand", action: ParrotSequence): void;
}>();

const QUERY_API_URL = import.meta.env.DEV
  ? "http://localhost:5001/taco-parrot/us-central1/processRequest"
  : "https://us-central1-taco-parrot.cloudfunctions.net/processRequest";

const COMMAND_API_URL = import.meta.env.DEV
  ? "http://localhost:5001/taco-parrot/us-central1/getActionForCommand"
  : "https://us-central1-taco-parrot.cloudfunctions.net/getActionForCommand";

const text = ref("");
const transcript = ref("");
const isRecording = ref(false);
const voiceControl = ref(false);
const Recognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const sr = new Recognition();

let keywordDetected = false;

onMounted(() => {
  sr.continuous = true;
  sr.interimResults = true;
  sr.lang = "nl-NL";
  sr.onstart = () => {
    console.log("SR Started");
    isRecording.value = true;
    transcript.value = "";
  };
  sr.onend = () => {
    console.log("SR Stopped");
    isRecording.value = false;
  };
  sr.onresult = (evt: any) => {
    for (let i = 0; i < evt.results.length; i++) {
      const result = evt.results[i];
      if (result.isFinal) CheckForCommand(result);
    }
    const t = Array.from(evt.results)
      .map((result: any) => result[0])
      .map((result) => result.transcript)
      .join("");

    transcript.value = t;
  };
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CheckForCommand = async (result: any) => {
  const t = result[0].transcript as string;
  if (t.toLowerCase().includes("taco") && !keywordDetected) {
    sr.stop();
    keywordDetected = true;
    await SendCommand(ParrotCommands.WELCOME);
    setTimeout(() => sr.start(), 100);
  } else if (keywordDetected) {
    keywordDetected = false;
    sr.stop();
    await SendQuery(transcript.value.toLowerCase());
    setTimeout(() => sr.start(), 100);
  }
};

const ToggleMic = () => {
  if (voiceControl.value) {
    sr.stop();
  } else {
    sr.start();
  }
  voiceControl.value = !voiceControl.value;
};

async function SendQuery(text: string) {
  let response = (await (
    await fetch(`${QUERY_API_URL}?text=${text}`)
  ).json()) as ParrotSequence;
  emit("tacoCommand", response);
  await Sleep(getSequenceTime(response));
}

async function SendCommand(command: ParrotCommands) {
  let response = (await (
    await fetch(`${COMMAND_API_URL}?command=${command.toString()}`)
  ).json()) as ParrotSequence;
  emit("tacoCommand", response);
  await Sleep(getSequenceTime(response));
}

function getSequenceTime(sequence: ParrotSequence): number {
  let sequenceTime = 0;
  sequence.actions.forEach((action) =>
    action.movements.forEach((m) => (sequenceTime += m.offset))
  );
  if (sequenceTime == 0) {
    sequenceTime = 2; // default time
  }
  return sequenceTime * 1000;
}

async function send() {
  // Get the sequence for the input.
  SendQuery(text.value);
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Taco emulator</h1>
    <h3>
      Talk to taco:<br />
      <button :class="`mic`" @click="ToggleMic">
        {{ voiceControl ? "Disable" : "Enable" }} speech recognition
      </button>
      <div v-if="isRecording" class="transcript" v-text="transcript"></div>
      <input v-if="!voiceControl" type="text" v-model="text" />
      <button v-if="!voiceControl" @click="send">Send!</button>
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
