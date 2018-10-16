/**
 * 前端加密-Bncrypt
 * @module Bncrypt
 */
import bcrypt from 'bcryptjs'

const {
  genSaltSync,
  genSalt,
  hashSync,
  hash,
  compare,
  compareSync } = bcrypt;

/**
 * 加密
 *
 * @param {String} string 加密内容
 * @returns {String} 加密后的数据
 */
function encrypt(string) {
  return genSalt().then((salt) => hash(string, salt));
}

/**
 * 加密
 *
 * @param {String} string 加密内容
 * @returns {String} 加密后的数据
 */
function encryptSync(string) {
  const salt = genSaltSync();
  return hashSync(string, salt);
}

export default {
  genSalt,
  genSaltSync,
  hash,
  hashSync,
  encrypt,
  encryptSync,
  compare,
  compareSync,
}
