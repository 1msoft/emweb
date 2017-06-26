
export const QueryFormsInput =
  (text, parms, queryName, queryValue, queryReg) => {
  return Object.assign({type: 'input', text, parms, queryName, queryValue, queryReg })
}

export const QueryFormsSelect =
  (text, parms, options, queryName, queryValue, queryReg) => {
  return Object.assign({type: 'select', text, parms, options, queryName, queryValue, queryReg })
}

export const QueryFormsDateTime =
  (text, startParms, endParms, queryName, startQueryValue, endQueryValue) => {
    return Object.assign({type: 'dateTime', text, startParms, endParms, queryName, startQueryValue, endQueryValue})
}

export const QueryFormsButton =
  (text, parms) => {
  return Object.assign({type: 'button', text, parms})
}

export const QueryFormsQuery =
  (clickFunction, parms) => {
      return Object.assign({type: 'query', clickFunction, parms})
}