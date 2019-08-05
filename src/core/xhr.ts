import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helps/headers'
import { createError } from '../helps/error'
export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, url, method = 'get', headers, reponseType, timeout } = config
    const request = new XMLHttpRequest()
    if (reponseType) {
      request.responseType = reponseType
    }
    if (timeout) {
      request.timeout = timeout
    }
    request.open(method.toUpperCase(), url!, async: true)
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }
      if (request.status === 0) {
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
      handleResponse(reponse)
    }
    request.onerror = function handleError() {
      reject(createError('Network error', config, null, request))
    }
    request.ontimeout = function handleTimeout() {
      reject(createError(`Timeout of ${timeout}  ms exceeded`, config, 'ECONNABORTED', request))
    }

    Object.keys(headers).forEach((name) => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }

    })

    request.send(data)
    function handleResponse(reponse: AxiosResponse): void {
      if (reponse.status >= 200 || reponse.status < 300) {
        resolve(reponse)
      } else {
        reject(createError(`Request faild with status code ${reponse.status}`, config, null, request, reponse))
      }
    }


  })



} 