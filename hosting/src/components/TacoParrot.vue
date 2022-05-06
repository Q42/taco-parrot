<script setup lang="ts">
import { Sleep } from "@/helpers";
import { ref } from "vue";
import type {
  ParrotMovement,
  ParrotSequence,
} from "../../../functions/src/parrotTypes";

let movement = ref("");
let tacoImg = ref("taco/neutral.png");

async function HandleAction(sequence: ParrotSequence) {
  // Go over all sequences for the action
  for (const action of sequence.actions) {
    // Play the audio
    var audio = new Audio(action.audioUrl);
    audio.play();

    // Execute all movements for the audio
    for await (const move of action.movements) {
      await HandleMovement(move);
    }

    // Wait for the audio to finish.
    var audioTimeLeft = audio.duration - audio.currentTime;
    await new Promise((f) => setTimeout(f, audioTimeLeft * 1000));
    movement.value = "";
  }
}

async function HandleMovement(movement: ParrotMovement) {
  console.log(movement.type);
  let actionWaitTime = 0;

  switch (movement.type) {
    case "BLINK":
      tacoImg.value = "taco/closed_eye.png";
      actionWaitTime = 70;
      await Sleep(actionWaitTime);
      tacoImg.value = "taco/neutral.png";
      break;
    case "MOUTH_OPEN":
      tacoImg.value = "taco/mouth_open.png";
      await Sleep(300);
      tacoImg.value = "taco/closed_eye.png";
      await Sleep(100);
      tacoImg.value = "taco/neutral.png";
      actionWaitTime = 200;
      break;
    case "MOVE_FORWARD":
      tacoImg.value = "taco/wingflap.png";
      break;
    default:
      tacoImg.value = "taco/neutral.png";
  }
  await Sleep(Math.max(0, movement.offset * 1000 - actionWaitTime));
}

defineExpose({
  HandleAction,
});
</script>

<template>
  <img :src="tacoImg" width="500" />
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
