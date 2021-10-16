export function getActiveType (value) {
  switch (value) {
    case true:
      return 'success'
    case false:
      return 'warning'
    case 1:
      return 'success'
    case 0:
      return 'warning'
    default:
      return 'info'
  }
}

export function getActiveText (value) {
  switch (value) {
    case true:
      return 'Valid'
    case false:
      return 'Invalid'
    case 1:
      return 'Valid'
    case 0:
      return 'Invalid'
    default:
      return 'Undefined'
  }
}
