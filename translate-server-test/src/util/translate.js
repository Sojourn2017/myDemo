/**
 * 调用翻译
 */ 
import * as tjs from 'translation.js'

export default {
  translate(queryObj, api = 'baidu') {
    return tjs[api].translate(queryObj);
  },
  audio(queryObj, api = 'baidu') {
    return tjs[api].audio(queryObj);
  }
}