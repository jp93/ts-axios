import { AxiosRequestConfig, AxiosResponse } from '../types'
export class AxiosError extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  reponse?: AxiosResponse
  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    reponse?: AxiosResponse
  ) {
    super(message)
    this.config = config
    this.code = code
    this.request = request
    this.reponse = reponse
    this.isAxiosError = true
    Object.setPrototypeOf(this, AxiosError.prototype)
  }

}
export function createError(
  message: string,
  config: AxiosRequestConfig,
  code?: string | null,
  request?: any,
  reponse?: AxiosResponse):AxiosError {
  const error = new AxiosError(message, config, code, request, reponse)
  return error
}
