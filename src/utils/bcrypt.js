import bcrypt from 'bcryptjs'

const {
  genSaltSync, 
  genSalt, 
  hashSync, 
  hash, 
  compare, 
  compareSync } = bcrypt;

function encrypt(string) {
  return genSalt().then( (salt) => hash(string, salt) );
}

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