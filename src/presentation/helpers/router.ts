import { HttpRequestType, HttpResponseType } from './http-helper'

export type RouterType = {
  perform: (httpRequest: HttpRequestType) => Promise<HttpResponseType>
}
