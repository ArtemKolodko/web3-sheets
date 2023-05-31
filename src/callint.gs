function json(url) {
  var jsondata = UrlFetchApp.fetch(url, null);
  return JSON.parse(jsondata.getContentText());
}

function CALLINT(value, formatting) {
  const params = value.split('.')

  let result = ''
  for (let i = 0; i < params.length; i++) {
    const param = params[i]

    if(param.startsWith("json")) {
      const [, cellCoordinates] = param.split(/[()]/)
      const cellValue = SpreadsheetApp.getActiveSheet().getRange(cellCoordinates).getValue();
      result = json(cellValue)
    } else if(param.startsWith("if")) {
      const [, condition] = param.split(/[()]/)
      const [operator] = /==|!==/.exec(condition) // operator: == or !==
      let [nestedProperty, nestedValue] = condition.split(operator)
      nestedValue = nestedValue.replaceAll(`'`, '')

      result = result.find(item => {
        const itemValue = item[nestedProperty]
        if(operator === '==') {
          return itemValue === nestedValue
        }
        return itemValue !== nestedValue
      })
    } else {
      // read JSON nested value
      result = result[param]
    }
  }

  if(formatting) {
    let options = {}
    if(formatting === 'usd') {
      options = { ...options, style: 'currency', currency: 'USD' }
    }
    return new Intl.NumberFormat('en-US', options).format(+result)
  }

  return result
}
