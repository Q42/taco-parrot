<script setup lang="ts">
import { ref } from "vue";
import type { ParrotSequence } from "../../functions/src/parrotTypes";
import TacoParrot from "./components/TacoParrot.vue";
import TacoVoice from "./components/TacoVoice.vue";
import { loadScript } from "vue-plugin-load-script";

loadScript("https://storage.googleapis.com/static.q42.nl/q42.js");

const taco = ref(TacoParrot);

function handleCommand(actions: ParrotSequence) {
  console.log(actions);
  taco.value.HandleAction(actions);
}
</script>

<template>
  <header>
    <q42 width="125" height="125" />

    <div class="wrapper">
      <TacoVoice @taco-command="handleCommand" />
    </div>
  </header>

  <main>
    <TacoParrot ref="taco" />
  </main>
</template>

<style>
@import "./assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }
}
</style>
