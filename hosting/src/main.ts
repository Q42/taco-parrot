import { createApp } from 'vue';
import App from './App.vue';
import LoadScript from 'vue-plugin-load-script';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
app.use(LoadScript);
app.component('font-awesome-icon', FontAwesomeIcon);

// app.config.compilerOptions.isCustomElement = (tag) => {
//   return tag.includes('q42');
// };

app.mount('#app');
