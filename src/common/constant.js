
export const DATABASE_USER = process.env.REACT_APP_COUCHDB_USER
export const DATABASE_PASSOWRD = process.env.REACT_APP_COUCHDB_PWD
export const DATABASE_DBHOST = process.env.REACT_APP_COUCHDB_HOST
export const DATABASE_DBPORT = process.env.REACT_APP_COUCHDB_PORT
export const DATABASE_DBNAME = process.env.REACT_APP_COUCHDB_DBNAME
export const DATABASE_URL = `http://${DATABASE_USER}:${DATABASE_PASSOWRD}`
  + `@${DATABASE_DBHOST}:${DATABASE_DBPORT}/${DATABASE_DBNAME}`
