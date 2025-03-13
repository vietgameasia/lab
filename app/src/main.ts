import "./assets/base.css"

import { createApp } from "vue"
import App from "./App.vue"
import ui from "@nuxt/ui/vue-plugin"
import router from "./router"

const app = createApp(App)

app.use(router)
app.use(ui)

app.mount("#app")
