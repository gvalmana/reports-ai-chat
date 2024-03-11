import routes from './router/index'
import { RouteRecordRaw } from 'vue-router'
import { convertDictionaryToObject } from './utils/appHelpers'
import '../../node_modules/@alegradev/smile-ui-next/dist/style.css'
import '../index.css'

interface IMicrofrontent {
  routes: Array<RouteRecordRaw>
  dictionary: object
}

const microSettings: IMicrofrontent = {
  routes,
  dictionary: convertDictionaryToObject(),
}

export { microSettings }
