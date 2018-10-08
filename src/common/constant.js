
/**
 * 常量模块
 * @module Constant
 */

/**
 * COUCDB用户名称
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_USER = process.env.REACT_APP_COUCHDB_USER

/**
 * COUCDB密码
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_PASSOWRD = process.env.REACT_APP_COUCHDB_PWD

/**
 * COUCDB主机地址
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_DBHOST = process.env.REACT_APP_COUCHDB_HOST

/**
 * COUCDB端口号
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_DBPORT = process.env.REACT_APP_COUCHDB_PORT

/**
 * COUCDB数据库名称
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_DBNAME = process.env.REACT_APP_COUCHDB_DBNAME

/**
 * COUCDB链接地址
 * @constant
 * @type {String}
 * @default
 */
export const DATABASE_URL = `http://${DATABASE_USER}:${DATABASE_PASSOWRD}`
  + `@${DATABASE_DBHOST}:${DATABASE_DBPORT}/${DATABASE_DBNAME}`
