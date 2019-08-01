import { promises } from "fs";

export type Method = 'get' | 'GET'
  | 'deletet' | 'Delete'
  | 'head' | 'HEAD'
  | 'options' | 'OPTIONS'
  | 'post' | 'POST'
  | 'put' | 'PUT'
  | 'patch' | 'PATCH'
export interface AxiosRequestConfig {
  url: string,
  method?: Method,
  data?: any,
  params?: any,
  headers?:any,
  reponseType?: XMLHttpRequestResponseType
}
export interface AxiosResponse{
  data:any,
  status:number,
  statusText:string,
  headers:any,
  config:AxiosRequestConfig,
  request:any

}
export interface AxiosPromise extends Promise<AxiosResponse> {

}