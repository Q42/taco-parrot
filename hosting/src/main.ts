import { createApp } from 'vue';
import App from './App.vue';
import LoadScript from 'vue-plugin-load-script';

const app = createApp(App);
app.use(LoadScript);
// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.includes('q42');
// };

app.mount('#app');