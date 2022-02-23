import singleSpaVue from 'single-spa-vue'

import App from './App.vue'

import './styles/main.css'

// import { installDeps, installDir } from '@alegradev/smile-ui-alegra-next'

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render() {
      return h(App, {
        props: {
          // single-spa props are available on the "this" object. Forward them to your component as needed.
          // https://single-spa.js.org/docs/building-applications#lifecyle-props
          name: this.name,
          mountParcel: this.mountParcel,
          singleSpa: this.singleSpa
        },
      });
    },
  },
  handleInstance: async (app) => {
    // installDeps(app)
    // installDir(app)
    // install all modules under `modules/`
    Object.values(import.meta.globEager('./modules/*.ts')).forEach(m => app.use(m))
  },
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
