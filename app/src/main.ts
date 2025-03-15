import "./assets/base.css"

import { createApp } from "vue"
import App from "./App.vue"
import ui from "@nuxt/ui/vue-plugin"
import router from "./router"
import { createI18n } from "vue-i18n"
import vi from "@/locales/vi"
import en from "@/locales/en"

const i18n = createI18n({
  locale: "vi",
  fallbackLocale: "en",
  messages: {
    vi,
    en,
  },
})

const app = createApp(App)

app.use(router)
app.use(ui)
app.use(i18n)

app.mount("#app")
