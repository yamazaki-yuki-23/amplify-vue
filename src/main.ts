import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// Amplify
import { Amplify } from 'aws-amplify'
import awsconfig from './aws-exports'
Amplify.configure(awsconfig)

// Amplify UI Vue
import AmplifyVue from '@aws-amplify/ui-vue'
import '@aws-amplify/ui-vue/styles.css'

const app = createApp(App)
app.use(AmplifyVue)
app.use(router)

app.mount('#app')
