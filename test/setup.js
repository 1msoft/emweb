// 创建浏览器环境
import { JSDOM } from 'jsdom';
if( typeof document === 'undefined' ){
  const dom = new JSDOM('<!doctype html><html><head></head><body></body></html>');
  global.window = dom.window;
  global.document = global.window.document;
  global.navigator = global.window.navigator;
}
