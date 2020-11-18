import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helps/util'
function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context)
  extend(context, instance)
  return instance as AxiosInstance
}
const axios = createInstance()
export default axios