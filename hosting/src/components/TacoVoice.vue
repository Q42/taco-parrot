<script setup lang="ts">
import { ref } from "vue";
import type { ParrotSequence } from "../../../functions/src/parrotTypes";

const emit = defineEmits<{
  (e: "tacoCommand", action: ParrotSequence): void;
}>();

const text = ref("");

const API_URL = import.meta.env.DEV
  ? "http://localhost:5001/taco-parrot/us-central1/processRequest"
  : "https://us-central1-taco-parrot.cloudfunctions.net/processRequest";

async function send() {
  // Get the sequence for the input.
  let response = (await (
    await fetch(`${API_URL}?text=${text.value}`)
  ).json()) as ParrotSequence;
  emit("tacoCommand", response);
}
</script>

<template>
  <div class="greetings">
    <h1 class="green">Taco emulator</h1>
    <h3>
      Talk to taco:<br />
      <input type="text" v-model="text" />
      <button @click="send">Send!</button>
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
