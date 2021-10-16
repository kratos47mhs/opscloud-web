export function getUserRoleType (value) {
  switch (value) {
    case 'User':
      return 'success'
    case 'Auditor':
      return 'warning'
    case 'Admin':
      return 'danger'
    default:
      return 'info'
  }
}

export function getUserRoleText (value) {
  switch (value) {
    case 'User':
      return 'User'
    case 'Auditor':
      return 'Auditor'
    case 'Admin':
      return 'Administrator'
    default:
      return 'Undefined'
  }
}
