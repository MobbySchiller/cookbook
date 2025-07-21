import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/index.css'
import CButtonAccent from './components/CButton/CButtonAccent.vue'
import CButtonPrimary from './components/CButton/CButtonPrimary.vue'
import CCard from './components/CCard/CCard.vue'
import CInput from './components/CInput/CInput.vue'

const app = createApp(App)

app
  .component('CCard', CCard)
  .component('CButtonAccent', CButtonAccent)
  .component('CButtonPrimary', CButtonPrimary)
  .component('CInput', CInput)

app.use(router)

app.mount('#app')
