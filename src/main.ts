import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

for (const [key, value] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, value)
}

app.use(ElementPlus)
app.use(ArcoVueIcon);
app.use(router)
app.mount('#app')
