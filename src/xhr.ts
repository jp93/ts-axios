import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helps/headers'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, reponseType } = config
    const request = new XMLHttpRequest()
    if (reponseType) {
      request.responseType = reponseType
    }
    request.open(method.toUpperCase(), url, async: true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      const reponseHeaders = parseHeaders(request.getAllResponseHeaders())
      const reponseData = reponseType !== 'text' ? request.response : request.responseText
      const reponse: AxiosResponse = {
        data: reponseData,
        status: request.status,
        statusText: request.statusText,
        headers: reponseHeaders,
        config,
        request
      }
      resolve(reponse)
    }
    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }

    })

    request.send(data)


  })



} 