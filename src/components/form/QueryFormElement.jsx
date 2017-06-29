
export const QueryFormsInput =
  (label, parms, queryName, queryValue, queryReg) => {
  return Object.assign({type: 'input', label, parms, queryName, queryValue, queryReg })
}

export const QueryFormsSelect =
  (label, parms, options, queryName, queryValue, queryReg) => {
  return Object.assign({type: 'select', label, parms, options, queryName, queryValue, queryReg })
}

export const QueryFormsDateTime =
  (label, startParms, endParms, queryName, startQueryValue, endQueryValue) => {
    return Object.assign({type: 'dateTime', label, startParms, endParms, queryName, startQueryValue, endQueryValue})
}

export const QueryFormsButton =
  (text, parms) => {
  return Object.assign({type: 'button', text, parms})
}

export const QueryFormsQuery =
  (clickFunction, parms) => {
      return Object.assign({type: 'query', clickFunction, parms})
}