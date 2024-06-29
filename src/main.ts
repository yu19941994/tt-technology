import './assets/main.css'
import './assets/reset.css'

import { createApp, onMounted } from 'vue'
import mock from './mocks/server'
import App from './App.vue'
import registerDirectives from './directives/directives'

mock.start({
  onUnhandledRequest: 'bypass',
})
const app = createApp(App)
registerDirectives(app)
app.mount('#app')

